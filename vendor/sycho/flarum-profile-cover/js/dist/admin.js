(()=>{var e={n:o=>{var r=o&&o.__esModule?()=>o.default:()=>o;return e.d(r,{a:r}),r},d:(o,r)=>{for(var t in r)e.o(r,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:r[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};(()=>{"use strict";e.r(o);const r=flarum.core.compat["admin/app"];var t=e.n(r);const a=flarum.core.compat["common/utils/withAttr"];var i=e.n(a);function n(e,o){if(void 0===o&&(o=2),0===e)return"0 Bytes";var r=o<0?0:o,t=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,t)).toFixed(r))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}t().initializers.add("sycho-profile-cover",(function(){t().extensionData.for("sycho-profile-cover").registerSetting({setting:"sycho-profile-cover.thumbnails",type:"boolean",label:t().translator.trans("sycho-profile-cover.admin.thumbnails")}).registerSetting((function(){var e=this.setting("sycho-profile-cover.max_size",10240);return m("div",{className:"Form-group"},m("label",null,t().translator.trans("sycho-profile-cover.admin.max_size")),m("div",{className:"ProfileCover-size-input"},m("input",{type:"number",className:"FormControl",value:e(),oninput:i()("value",e)}),m("input",{className:"FormControl",value:n(e()*Math.pow(2,10)),disabled:!0})))})).registerPermission({icon:"fas fa-image",label:t().translator.trans("sycho-profile-cover.admin.permission.set_cover"),permission:"setProfileCover"},"start")}))})(),module.exports=o})();
//# sourceMappingURL=admin.js.map
