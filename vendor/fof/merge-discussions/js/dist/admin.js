(()=>{var e={n:s=>{var r=s&&s.__esModule?()=>s.default:()=>s;return e.d(r,{a:r}),r},d:(s,r)=>{for(var i in r)e.o(r,i)&&!e.o(s,i)&&Object.defineProperty(s,i,{enumerable:!0,get:r[i]})},o:(e,s)=>Object.prototype.hasOwnProperty.call(e,s),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},s={};(()=>{"use strict";e.r(s);const r=flarum.core.compat["admin/app"];var i=e.n(r);i().initializers.add("fof/merge-discussions",(function(){i().extensionData.for("fof-merge-discussions").registerPermission({icon:"fas fa-code-branch fa-flip-vertical",label:i().translator.trans("fof-merge-discussions.admin.permissions.merge_discussions_label"),permission:"discussion.merge"},"moderate").registerSetting({label:i().translator.trans("fof-merge-discussions.admin.settings.search_result_label"),type:"number",setting:"fof-merge-discussions.search_limit",help:i().translator.trans("fof-merge-discussions.admin.settings.search_result_help"),min:1,max:99})}))})(),module.exports=s})();
//# sourceMappingURL=admin.js.map