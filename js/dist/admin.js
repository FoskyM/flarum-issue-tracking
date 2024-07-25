(()=>{var t={n:e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},d:(e,r)=>{for(var i in r)t.o(r,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:r[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>c});const r=flarum.core.compat["common/extenders"];var i=t.n(r);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}function n(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,s(t,e)}const a=flarum.core.compat["common/Model"];var o=t.n(a),u=function(t){function e(){for(var e,r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))||this).id=o().attribute("id"),e.slug=o().attribute("slug"),e.title=o().attribute("title"),e.description=o().attribute("description"),e.author=o().attribute("author"),e.state=o().attribute("state"),e.priority=o().attribute("priority"),e.type=o().attribute("type"),e.created_at=o().attribute("created_at",o().transformDate),e.updated_at=o().attribute("updated_at",o().transformDate),e.resolved_at=o().attribute("resolved_at",o().transformDate),e.is_resolved=o().attribute("is_resolved"),e.progress=o().attribute("progress"),e.discussion=o().hasOne("discussion"),e.discussion_id=o().attribute("discussion_id"),e}return n(e,t),e}(o()),l=function(t){function e(){for(var e,r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))||this).id=o().attribute("id"),e.discussion_id=o().attribute("discussion_id"),e.issue_id=o().attribute("issue_id"),e}return n(e,t),e}(o());const c=[(new(i().Store)).add("issue-tracking-issues",u).add("issue-tracking-discussion-issue",l)],d=flarum.core.compat["admin/app"];var p=t.n(d);function g(){return g=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)({}).hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},g.apply(null,arguments)}const f=flarum.core.compat["admin/components/ExtensionPage"];var b=t.n(f);const y=flarum.core.compat["common/components/LoadingIndicator"];var v=t.n(y);const h=flarum.core.compat["common/components/FieldSet"];var k=t.n(h),_=function(t){function e(){for(var e,r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))||this).providerFields=void 0,e.status=void 0,e}n(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.refresh()},r.refresh=function(){var t=this;this.loading=!0,this.status={errors:{}},p().request({method:"GET",url:p().forum.attribute("apiUrl")+"/issue-tracking/settings"}).then((function(e){t.providerFields=e.data.attributes.fields,t.status.errors=e.data.attributes.errors,t.loading=!1,m.redraw()}))},r.content=function(){var t=this;if(this.loading)return m(v(),null);var e=this.providerFields[this.setting("foskym-issue-tracking.provider")()].settings,r=Object.keys(e),i=Object.keys(this.providerFields).reduce((function(e,r){var i;return g({},e,((i={})[r]=t.providerFields[r].name,i))}),{});return m("div",{className:"container IssueTracking-container"},m("div",{className:"Form"},this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_create_issue",label:p().translator.trans("foskym-issue-tracking.admin.enable_create_issue_label")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_auto_import",label:p().translator.trans("foskym-issue-tracking.admin.enable_auto_import_label")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_comment_sync",label:p().translator.trans("foskym-issue-tracking.admin.enable_comment_sync_label")}),this.buildSettingComponent({type:"select",setting:"foskym-issue-tracking.provider",options:i,label:p().translator.trans("foskym-issue-tracking.admin.provider_heading")}),!!r.length&&m(k(),{label:p().translator.trans(this.setting("foskym-issue-tracking.provider")()+".admin.fields.heading"),className:"IssueTrackingPage-IssueTrackingSettings"},m("div",{className:"IssueTrackingPage-IssueTrackingSettings-input"},r.map((function(r){var i=e[r];return m("[",null,t.buildSettingComponent({type:"string"==typeof i?"text":"select",label:p().translator.trans(t.setting("foskym-issue-tracking.provider")()+".admin.fields."+r+"_label"),help:p().translator.trans(t.setting("foskym-issue-tracking.provider")()+".admin.fields."+r+"_help")===t.setting("foskym-issue-tracking.provider")()+".admin.fields."+r+"_help"?"":p().translator.trans(t.setting("foskym-issue-tracking.provider")()+".admin.fields."+r+"_help"),setting:t.setting("foskym-issue-tracking.provider")()+"."+r,options:i}),t.status.errors[r]&&m("p",{className:"ValidationError"},t.status.errors[r]))})))),this.submitButton()))},r.saveSettings=function(e){var r=this;return t.prototype.saveSettings.call(this,e).then((function(){return r.refresh()}))},e}(b());p().initializers.add("foskym/flarum-issue-tracking",(function(){p().extensionData.for("foskym-issue-tracking").registerPage(_)}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map