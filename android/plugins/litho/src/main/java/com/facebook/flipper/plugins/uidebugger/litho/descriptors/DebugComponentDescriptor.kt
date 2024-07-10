/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.flipper.plugins.uidebugger.litho.descriptors

import android.util.Log
import com.facebook.flipper.core.FlipperDynamic
import com.facebook.flipper.plugins.uidebugger.LogTag
import com.facebook.flipper.plugins.uidebugger.descriptors.CompoundTypeHint
import com.facebook.flipper.plugins.uidebugger.descriptors.DescriptorRegister
import com.facebook.flipper.plugins.uidebugger.descriptors.Id
import com.facebook.flipper.plugins.uidebugger.descriptors.MetadataRegister
import com.facebook.flipper.plugins.uidebugger.descriptors.NodeDescriptor
import com.facebook.flipper.plugins.uidebugger.descriptors.OffsetChild
import com.facebook.flipper.plugins.uidebugger.litho.LithoMountableTag
import com.facebook.flipper.plugins.uidebugger.litho.LithoTag
import com.facebook.flipper.plugins.uidebugger.litho.descriptors.props.ComponentDataExtractor
import com.facebook.flipper.plugins.uidebugger.litho.descriptors.props.LayoutPropExtractor
import com.facebook.flipper.plugins.uidebugger.model.Bounds
import com.facebook.flipper.plugins.uidebugger.model.BoxData
import com.facebook.flipper.plugins.uidebugger.model.Inspectable
import com.facebook.flipper.plugins.uidebugger.model.InspectableObject
import com.facebook.flipper.plugins.uidebugger.model.InspectableValue
import com.facebook.flipper.plugins.uidebugger.model.Metadata
import com.facebook.flipper.plugins.uidebugger.model.MetadataId
import com.facebook.flipper.plugins.uidebugger.util.Deferred
import com.facebook.flipper.plugins.uidebugger.util.MaybeDeferred
import com.facebook.litho.Component
import com.facebook.litho.DebugComponent
import com.facebook.litho.DebugLayoutNodeEditor
import com.facebook.litho.StateContainer
import com.facebook.litho.sections.widget.SectionBinderTarget
import com.facebook.litho.widget.Binder
import com.facebook.litho.widget.Recycler
import com.facebook.litho.widget.RecyclerBinder
import com.facebook.rendercore.FastMath
import com.facebook.yoga.YogaEdge
import java.lang.reflect.Modifier
import kotlinx.serialization.json.JsonObject

typealias GlobalKey = String

// each entry in the map is an override to a particular attribute, mutable updates to the same
// attribute will replace the entry
typealias NodeOverrides = MutableMap<List<MetadataId>, DebugComponentDescriptor.OverrideData>

class DebugComponentDescriptor(val register: DescriptorRegister) : NodeDescriptor<DebugComponent> {
  private val NAMESPACE = "DebugComponent"

  /*
   * Debug component is generated on the fly so use the underlying component instance which is
   * immutable
   */
  override fun getId(node: DebugComponent): Id = node.globalKey.hashCode()

  override fun getName(node: DebugComponent): String = node.component.simpleName

  override fun getQualifiedName(node: com.facebook.litho.DebugComponent): String =
      node.component::class.qualifiedName ?: ""

  override fun getBoxData(node: DebugComponent): BoxData? {
    val layoutNode = node.layoutNode ?: return null
    val margin =
        listOf<Float>(
            layoutNode.getLayoutMargin(YogaEdge.LEFT),
            layoutNode.getLayoutMargin(YogaEdge.RIGHT),
            layoutNode.getLayoutMargin(YogaEdge.TOP),
            layoutNode.getLayoutMargin(YogaEdge.BOTTOM))

    val border =
        listOf<Float>(
            layoutNode.getLayoutBorderWidth(YogaEdge.LEFT),
            layoutNode.getLayoutBorderWidth(YogaEdge.RIGHT),
            layoutNode.getLayoutBorderWidth(YogaEdge.TOP),
            layoutNode.getLayoutBorderWidth(YogaEdge.BOTTOM))

    val padding =
        listOf<Float>(
            layoutNode.getLayoutPadding(YogaEdge.LEFT),
            layoutNode.getLayoutPadding(YogaEdge.RIGHT),
            layoutNode.getLayoutPadding(YogaEdge.TOP),
            layoutNode.getLayoutPadding(YogaEdge.BOTTOM))

    return BoxData(margin, border, padding)
  }

  override fun getChildren(node: DebugComponent): List<Any> {
    val result = mutableListOf<Any>()

    val mountedContent = node.mountedContent

    if (mountedContent == null) {
      for (child in node.childComponents) {
        result.add(child)
      }
    } else {

      val layoutNode = node.layoutNode
      val descriptor: NodeDescriptor<Any> =
          register.descriptorForClassUnsafe(mountedContent.javaClass)
      // mountables are always layout nodes
      if (layoutNode != null) {
        /**
         * We need to override the mounted contents offset since the mounted contents android bounds
         * are w.r.t its native parent but we want it w.r.t to the mountable.
         *
         * However padding on a mountable means that the content is inset within the mountables
         * bounds so we need to adjust for this
         */
        result.add(
            OffsetChild(
                child = mountedContent,
                descriptor = descriptor,
                x = layoutNode.getLayoutPadding(YogaEdge.LEFT).let { FastMath.round(it) },
                y = layoutNode.getLayoutPadding(YogaEdge.TOP).let { FastMath.round(it) },
            ))
      }
    }

    return result
  }

  override fun getActiveChild(node: DebugComponent): Any? = null

  private val MeasureSpecId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "Litho Measure Specs")

  private val LayoutPropsId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "Layout Props")

  private val LayoutOutputsId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "Layout Outputs")

  private val UserPropsId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "User Props")

  private val RecyclerConfigurationId =
      MetadataRegister.register(
          MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "Recycler Configuration")

  private val StateId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "State")

  private val MountingDataId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "Mount State")

  private val isMountedAttributeId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "mounted")

  private val excludeFromIncrementalMountAttributeId =
      MetadataRegister.register(
          MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "excluded from incremental mount")

  private val isVisibleAttributeId =
      MetadataRegister.register(MetadataRegister.TYPE_ATTRIBUTE, NAMESPACE, "visible")

  override fun getAttributes(
      node: DebugComponent
  ): MaybeDeferred<Map<MetadataId, InspectableObject>> {

    // this accesses the litho view so do this on the main thread
    val mountingData = getMountingData(node)

    return Deferred {
      val attributeSections = mutableMapOf<MetadataId, InspectableObject>()

      if (!node.canResolve()) {
        val stateContainer = node.stateContainer
        if (stateContainer != null) {
          attributeSections[StateId] =
              ComponentDataExtractor.getState(stateContainer, node.component.simpleName)
        }

        val component = node.component
        if (component is Recycler) {
          setRecyclerAttributes(component, attributeSections)
        }

        val props = ComponentDataExtractor.getProps(node.component)
        attributeSections[UserPropsId] = InspectableObject(props.toMap())
      }

      val layoutProps = LayoutPropExtractor.getProps(node)
      attributeSections[LayoutPropsId] = InspectableObject(layoutProps.toMap())

      val layoutOutputs = LayoutPropExtractor.getResolvedOutputs(node)
      attributeSections[LayoutOutputsId] = InspectableObject(layoutOutputs.toMap())

      val measureSpecs = LayoutPropExtractor.getMeasureSpecs(node)
      attributeSections[MeasureSpecId] = InspectableObject(measureSpecs.toMap())

      attributeSections[MountingDataId] = InspectableObject(mountingData)

      attributeSections
    }
  }

  private fun setRecyclerAttributes(
      component: Recycler,
      attributeSections: MutableMap<MetadataId, InspectableObject>
  ) {
    try {
      val binder = component.extractRecyclerBinder()

      if (binder != null) {
        val recyclerBinderConfigField =
            binder.javaClass.getDeclaredField("mRecyclerBinderConfig").apply { isAccessible = true }

        val recyclerBinderConfig = recyclerBinderConfigField.get(binder)

        if (recyclerBinderConfig != null) {
          val configurationFields = recyclerBinderConfig.javaClass.declaredFields ?: emptyArray()

          val attributes =
              configurationFields
                  .filter { !Modifier.isStatic(it.modifiers) }
                  .associate { field ->
                    val metadataId =
                        MetadataRegister.register(
                            MetadataRegister.TYPE_ATTRIBUTE, "recyclerBinderConfig", field.name)

                    field.isAccessible = true

                    val inspectableValue =
                        when (val value = field.get(recyclerBinderConfig)) {
                          is Number -> InspectableValue.Number(value)
                          is Boolean -> InspectableValue.Boolean(value)
                          is String -> InspectableValue.Text(value)
                          else -> InspectableValue.Unknown(value?.toString() ?: "null")
                        }

                    metadataId to inspectableValue
                  }

          attributeSections[RecyclerConfigurationId] = InspectableObject(attributes)
        }
      }
    } catch (exception: Exception) {
      // Reflection is brittle - we safely catch the Exception
    }
  }

  override fun getBounds(node: DebugComponent): Bounds =
      Bounds.fromRect(node.boundsInParentDebugComponent)

  override fun getTags(node: DebugComponent): Set<String> {
    val tags: MutableSet<String> = mutableSetOf(LithoTag)
    if (node.component.mountType != Component.MountType.NONE) {
      tags.add(LithoMountableTag)
    }
    return tags
  }

  override fun getInlineAttributes(node: DebugComponent): Map<String, String> {
    val attributes = mutableMapOf<String, String>()
    val key = node.key
    val testKey = node.testKey
    if (key != null && key.trim { it <= ' ' }.length > 0) {
      attributes["key"] = key
    }
    if (testKey != null && testKey.trim { it <= ' ' }.length > 0) {
      attributes["testKey"] = testKey
    }
    return attributes
  }

  private fun getMountingData(node: DebugComponent): Map<Id, Inspectable> {

    val lithoView = node.lithoView
    val mountingData = mutableMapOf<MetadataId, Inspectable>()

    if (lithoView == null) {
      return mountingData
    }

    val mountState = lithoView.mountDelegateTarget
    val layoutState = lithoView.currentLayoutState ?: return mountingData

    val component = node.component

    if (component.mountType != Component.MountType.NONE) {
      val renderUnit = DebugComponent.getRenderUnit(node, layoutState)
      if (renderUnit != null) {
        val renderUnitId = renderUnit.id
        val isMounted = mountState.getContentById(renderUnitId) != null
        mountingData[isMountedAttributeId] = InspectableValue.Boolean(isMounted)
        mountingData[excludeFromIncrementalMountAttributeId] =
            InspectableValue.Boolean(
                DebugComponent.isExcludedFromIncrementalMount(node, layoutState))
      }
    }

    val visibilityOutput = DebugComponent.getVisibilityOutput(node, layoutState)
    if (visibilityOutput != null) {
      val isVisible = DebugComponent.isVisible(node, lithoView)
      mountingData[isVisibleAttributeId] = InspectableValue.Boolean(isVisible)
    }

    return mountingData
  }

  override fun getHiddenAttributes(node: DebugComponent): JsonObject? = null

  class OverrideData(
      val metadataPath: List<Metadata>,
      val value: FlipperDynamic,
      val hint: CompoundTypeHint?
  )

  private val allOverrides = mutableMapOf<GlobalKey, NodeOverrides>()

  override fun editAttribute(
      node: DebugComponent,
      metadataPath: List<Metadata>,
      value: FlipperDynamic,
      hint: CompoundTypeHint?
  ) {

    val componentOverrides = allOverrides.getOrPut(node.globalKey) { mutableMapOf() }
    componentOverrides[metadataPath.map { it.id }] = (OverrideData(metadataPath, value, hint))

    val overrider =
        object : DebugComponent.Overrider {

          override fun applyComponentOverrides(key: String, component: Component) {}

          override fun applyStateOverrides(key: String, state: StateContainer) {}

          override fun applyLayoutOverrides(key: String, debugNodeEditor: DebugLayoutNodeEditor) {

            componentOverrides
                .filter { it.key.firstOrNull() == LayoutPropsId }
                .forEach { overrideData ->
                  try {

                    LayoutPropExtractor.applyLayoutOverride(
                        debugNodeEditor,
                        overrideData.value.metadataPath.drop(1),
                        overrideData.value.value)
                  } catch (ex: Exception) {
                    Log.w(
                        LogTag,
                        "Unable to apply override to ${this@DebugComponentDescriptor.getName(node)}, path=${
                          overrideData.value.metadataPath.map { it.name }.joinToString(".")
                        } value=${overrideData.value.value.raw()} hint=${overrideData.value.hint}",
                        ex)
                  }
                }
          }
        }

    node.setOverrider(overrider)
    node.rerender()
  }
}

private fun Recycler.extractRecyclerBinder(): RecyclerBinder? {
  val binderField =
      this.javaClass.declaredFields
          .firstOrNull { Binder::class.java.isAssignableFrom(it.type) }
          ?.apply { isAccessible = true }

  return when (val binderInstance = binderField?.get(this)) {
    is RecyclerBinder -> {
      binderInstance
    }
    is SectionBinderTarget -> {
      val recyclerBinderField =
          (binderInstance as SectionBinderTarget)::class.java.declaredFields.firstOrNull {
            it.isAccessible = true
            it.name == "mRecyclerBinder"
          }

      recyclerBinderField?.get(binderInstance) as? RecyclerBinder
    }
    else -> {
      null
    }
  }
}
