"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3911],{3905:(e,r,t)=>{t.r(r),t.d(r,{MDXContext:()=>l,MDXProvider:()=>d,mdx:()=>y,useMDXComponents:()=>u,withMDXComponents:()=>s});var n=t(67294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(){return a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},a.apply(this,arguments)}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),s=function(e){return function(r){var t=u(r.components);return n.createElement(e,a({},r,{components:t}))}},u=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},d=function(e){var r=u(e.components);return n.createElement(l.Provider,{value:r},e.children)},m={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),s=u(t),d=o,f=s["".concat(i,".").concat(d)]||s[d]||m[d]||a;return t?n.createElement(f,p(p({ref:r},l),{},{components:t})):n.createElement(f,p({ref:r},l))}));function y(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=f;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=t[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},93556:(e,r,t)=>{t.r(r),t.d(r,{contentTitle:()=>s,default:()=>f,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var n=t(83117),o=t(80102),a=(t(67294),t(3905)),i=t(44996),p=t(39960),c=["components"],l={},s=void 0,u={type:"mdx",permalink:"/docs/plugins/crash-reporter/setup",source:"@site/src/embedded-pages/docs/plugins/crash-reporter/setup.mdx",description:"You don't have to instantiate the Crash Reporter plugin in your app in order to use its basic functionality.",frontMatter:{}},d=[{value:"Android",id:"android",level:2}],m={toc:d};function f(e){var r=e.components,t=(0,o.Z)(e,c);return(0,a.mdx)("wrapper",(0,n.Z)({},m,t,{components:r,mdxType:"MDXLayout"}),(0,a.mdx)("p",null,"You don't have to instantiate the ",(0,a.mdx)(p.default,{to:(0,i.default)("/docs/features/plugins/crash-reporter"),mdxType:"Link"},"Crash Reporter plugin")," in your app in order to use its basic functionality."),(0,a.mdx)("p",null,"You can use the Crash Reporter plugin to send notifications for exceptions that are suppressed in your Android application.\nYou could even use it to send notifications when the ",(0,a.mdx)("a",{parentName:"p",href:"https://www.internalfb.com/intern/staticdocs/litho/docs/mainconcepts/use-error-boundary/"},"Litho Error Boundary")," is triggered."),(0,a.mdx)("p",null,"In order to send custom notifications, take the steps detailed below."),(0,a.mdx)("h2",{id:"android"},"Android"),(0,a.mdx)("ol",null,(0,a.mdx)("li",{parentName:"ol"},"Instantiate and add the plugin in ",(0,a.mdx)("inlineCode",{parentName:"li"},"FlipperClient"),".")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-java"},"import com.facebook.flipper.plugins.crashreporter.CrashReporterPlugin;\n\nclient.addPlugin(CrashReporterPlugin.getInstance());\n")),(0,a.mdx)("ol",{start:2},(0,a.mdx)("li",{parentName:"ol"},"Use the following API to trigger your custom crash notification.")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-java"},"import com.facebook.flipper.plugins.crashreporter.CrashReporterPlugin;\n\nCrashReporterPlugin.getInstance().sendExceptionMessage(Thread.currentThread(), error);\n")))}f.isMDXComponent=!0}}]);