"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4723,8284],{3905:(e,r,t)=>{t.r(r),t.d(r,{MDXContext:()=>s,MDXProvider:()=>d,mdx:()=>b,useMDXComponents:()=>p,withMDXComponents:()=>c});var n=t(67294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(){return u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},u.apply(this,arguments)}function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},u=Object.keys(e);for(n=0;n<u.length;n++)t=u[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)t=u[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),c=function(e){return function(r){var t=p(r.components);return n.createElement(e,u({},r,{components:t}))}},p=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},d=function(e){var r=p(e.components);return n.createElement(s.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,u=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=p(t),d=a,m=c["".concat(l,".").concat(d)]||c[d]||f[d]||u;return t?n.createElement(m,i(i({ref:r},s),{},{components:t})):n.createElement(m,i({ref:r},s))}));function b(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var u=t.length,l=new Array(u);l[0]=m;var i={};for(var o in r)hasOwnProperty.call(r,o)&&(i[o]=r[o]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var s=2;s<u;s++)l[s]=t[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},81061:(e,r,t)=>{t.r(r),t.d(r,{contentTitle:()=>d,default:()=>v,frontMatter:()=>p,metadata:()=>f,toc:()=>m});var n=t(83117),a=t(80102),u=(t(67294),t(3905)),l=t(44996),i=t(39960),o=t(74866),s=t(85162),c=["components"],p={},d=void 0,f={type:"mdx",permalink:"/docs/plugins/preferences/setup",source:"@site/src/embedded-pages/docs/plugins/preferences/setup.mdx",description:"The Shared Preferences Viewer plugin is available for both Android and iOS.",frontMatter:{}},m=[{value:"Android",id:"android",level:2},{value:"iOS",id:"ios",level:2}],b={toc:m};function v(e){var r=e.components,t=(0,a.Z)(e,c);return(0,u.mdx)("wrapper",(0,n.Z)({},b,t,{components:r,mdxType:"MDXLayout"}),(0,u.mdx)("p",null,"The ",(0,u.mdx)(i.default,{to:(0,l.default)("/docs/features/plugins/preferences"),mdxType:"Link"},"Shared Preferences Viewer plugin")," is available for both ",(0,u.mdx)("a",{parentName:"p",href:"#android"},"Android")," and ",(0,u.mdx)("a",{parentName:"p",href:"#ios"},"iOS"),"."),(0,u.mdx)("h2",{id:"android"},"Android"),(0,u.mdx)("pre",null,(0,u.mdx)("code",{parentName:"pre",className:"language-java"},'import com.facebook.flipper.plugins.sharedpreferences.SharedPreferencesFlipperPlugin;\n\nclient.addPlugin(\n    new SharedPreferencesFlipperPlugin(context, "my_shared_preference_file"));\n')),(0,u.mdx)("h2",{id:"ios"},"iOS"),(0,u.mdx)("p",null,"If you want to use the Shared Preferences plugin, you need to add ",(0,u.mdx)("inlineCode",{parentName:"p"},"FlipperKit/FlipperKitUserDefaultsPlugin")," to your Podfile."),(0,u.mdx)("pre",null,(0,u.mdx)("code",{parentName:"pre",className:"language-ruby"},"pod 'FlipperKit/FlipperKitUserDefaultsPlugin', '~>' + flipperkit_version\n")),(0,u.mdx)("p",null,"Initialize the plugin in the following way:"),(0,u.mdx)(o.default,{defaultValue:"ios",values:[{label:"iOS",value:"ios"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,u.mdx)(s.default,{value:"ios",mdxType:"TabItem"},(0,u.mdx)("pre",null,(0,u.mdx)("code",{parentName:"pre",className:"language-objectivec"},'#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>\n\n[client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:@"your_suitename"]];\n'))),(0,u.mdx)(s.default,{value:"swift",mdxType:"TabItem"},(0,u.mdx)("pre",null,(0,u.mdx)("code",{parentName:"pre",className:"language-swift"},'import FlipperKit\n\nclient?.add(FKUserDefaultsPlugin.init(suiteName: "your_suitename"))\n')))))}v.isMDXComponent=!0},85162:(e,r,t)=>{t.r(r),t.d(r,{default:()=>l});var n=t(67294),a=t(86010);const u="tabItem_Ymn6";function l(e){var r=e.children,t=e.hidden,l=e.className;return n.createElement("div",{role:"tabpanel",className:(0,a.default)(u,l),hidden:t},r)}},74866:(e,r,t)=>{t.r(r),t.d(r,{default:()=>P});var n=t(83117),a=t(67294),u=t(86010),l=t(12466),i=t(76775),o=t(91980),s=t(67392),c=t(50012);function p(e){return function(e){return a.Children.map(e,(function(e){if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')}))}(e).map((function(e){var r=e.props;return{value:r.value,label:r.label,attributes:r.attributes,default:r.default}}))}function d(e){var r=e.values,t=e.children;return(0,a.useMemo)((function(){var e=null!=r?r:p(t);return function(e){var r=(0,s.l)(e,(function(e,r){return e.value===r.value}));if(r.length>0)throw new Error('Docusaurus error: Duplicate values "'+r.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[r,t])}function f(e){var r=e.value;return e.tabValues.some((function(e){return e.value===r}))}function m(e){var r=e.queryString,t=void 0!==r&&r,n=e.groupId,u=(0,i.k6)(),l=function(e){var r=e.queryString,t=void 0!==r&&r,n=e.groupId;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:t,groupId:n});return[(0,o._X)(l),(0,a.useCallback)((function(e){if(l){var r=new URLSearchParams(u.location.search);r.set(l,e),u.replace(Object.assign({},u.location,{search:r.toString()}))}}),[l,u])]}function b(e){var r,t,n,u,l=e.defaultValue,i=e.queryString,o=void 0!==i&&i,s=e.groupId,p=d(e),b=(0,a.useState)((function(){return function(e){var r,t=e.defaultValue,n=e.tabValues;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!f({value:t,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+t+'" but none of its children has the corresponding value. Available values are: '+n.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return t}var a=null!=(r=n.find((function(e){return e.default})))?r:n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:l,tabValues:p})})),v=b[0],g=b[1],h=m({queryString:o,groupId:s}),y=h[0],x=h[1],w=(r=function(e){return e?"docusaurus.tab."+e:null}({groupId:s}.groupId),t=(0,c.Nk)(r),n=t[0],u=t[1],[n,(0,a.useCallback)((function(e){r&&u.set(e)}),[r,u])]),P=w[0],O=w[1],S=function(){var e=null!=y?y:P;return f({value:e,tabValues:p})?e:null}();return(0,a.useLayoutEffect)((function(){S&&g(S)}),[S]),{selectedValue:v,selectValue:(0,a.useCallback)((function(e){if(!f({value:e,tabValues:p}))throw new Error("Can't select invalid tab value="+e);g(e),x(e),O(e)}),[x,O,p]),tabValues:p}}var v=t(72389);const g="tabList__CuJ",h="tabItem_LNqP";function y(e){var r=e.className,t=e.block,i=e.selectedValue,o=e.selectValue,s=e.tabValues,c=[],p=(0,l.o5)().blockElementScrollPositionUntilNextRender,d=function(e){var r=e.currentTarget,t=c.indexOf(r),n=s[t].value;n!==i&&(p(r),o(n))},f=function(e){var r,t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":var n,a=c.indexOf(e.currentTarget)+1;t=null!=(n=c[a])?n:c[0];break;case"ArrowLeft":var u,l=c.indexOf(e.currentTarget)-1;t=null!=(u=c[l])?u:c[c.length-1]}null==(r=t)||r.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.default)("tabs",{"tabs--block":t},r)},s.map((function(e){var r=e.value,t=e.label,l=e.attributes;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:i===r?0:-1,"aria-selected":i===r,key:r,ref:function(e){return c.push(e)},onKeyDown:f,onClick:d},l,{className:(0,u.default)("tabs__item",h,null==l?void 0:l.className,{"tabs__item--active":i===r})}),null!=t?t:r)})))}function x(e){var r=e.lazy,t=e.children,n=e.selectedValue;if(t=Array.isArray(t)?t:[t],r){var u=t.find((function(e){return e.props.value===n}));return u?(0,a.cloneElement)(u,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},t.map((function(e,r){return(0,a.cloneElement)(e,{key:r,hidden:e.props.value!==n})})))}function w(e){var r=b(e);return a.createElement("div",{className:(0,u.default)("tabs-container",g)},a.createElement(y,(0,n.Z)({},e,r)),a.createElement(x,(0,n.Z)({},e,r)))}function P(e){var r=(0,v.default)();return a.createElement(w,(0,n.Z)({key:String(r)},e))}},75235:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var n=t(83117),a=t(80102),u=(t(67294),t(3905)),l=t(81061),i=["components"],o={id:"preferences",title:"Shared Preferences Viewer Plugin Setup",sidebar_label:"Shared Preferences Viewer",custom_edit_url:"https://github.com/facebook/flipper/blob/main/desktop/plugins/public/shared_preferences/docs/setup.mdx"},s=void 0,c={unversionedId:"setup/plugins/preferences",id:"setup/plugins/preferences",title:"Shared Preferences Viewer Plugin Setup",description:"",source:"@site/../docs/setup/plugins/preferences.mdx",sourceDirName:"setup/plugins",slug:"/setup/plugins/preferences",permalink:"/docs/setup/plugins/preferences",draft:!1,editUrl:"https://github.com/facebook/flipper/blob/main/desktop/plugins/public/shared_preferences/docs/setup.mdx",tags:[],version:"current",frontMatter:{id:"preferences",title:"Shared Preferences Viewer Plugin Setup",sidebar_label:"Shared Preferences Viewer",custom_edit_url:"https://github.com/facebook/flipper/blob/main/desktop/plugins/public/shared_preferences/docs/setup.mdx"},sidebar:"main",previous:{title:"Network",permalink:"/docs/setup/plugins/network"},next:{title:"Sandbox",permalink:"/docs/setup/plugins/sandbox"}},p={},d=[],f={toc:d};function m(e){var r=e.components,t=(0,a.Z)(e,i);return(0,u.mdx)("wrapper",(0,n.Z)({},f,t,{components:r,mdxType:"MDXLayout"}),(0,u.mdx)(l.default,{mdxType:"Article"}))}m.isMDXComponent=!0}}]);