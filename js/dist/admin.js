(()=>{var t={n:e=>{var s=e&&e.__esModule?()=>e.default:()=>e;return t.d(s,{a:s}),s},d:(e,s)=>{for(var n in s)t.o(s,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:s[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>l});const s=flarum.core.compat["common/extenders"];var n=t.n(s);function r(t,e){return r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},r(t,e)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,r(t,e)}const a=flarum.core.compat["common/Model"];var o=t.n(a),c=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).id=o().attribute("id"),e.slug=o().attribute("slug"),e.title=o().attribute("title"),e.description=o().attribute("description"),e.author=o().attribute("author"),e.state=o().attribute("state"),e.priority=o().attribute("priority"),e.type=o().attribute("type"),e.created_at=o().attribute("created_at",o().transformDate),e.updated_at=o().attribute("updated_at",o().transformDate),e.resolved_at=o().attribute("resolved_at",o().transformDate),e.is_resolved=o().attribute("is_resolved"),e.progress=o().attribute("progress"),e.discussion=o().hasOne("discussion"),e.discussion_id=o().attribute("discussion_id"),e}return i(e,t),e}(o()),u=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).id=o().attribute("id"),e.discussion_id=o().attribute("discussion_id"),e.issue_id=o().attribute("issue_id"),e}return i(e,t),e}(o());const l=[(new(n().Store)).add("issue-tracking-issues",c).add("issue-tracking-discussion-issue",u)],d=flarum.core.compat["admin/app"];var p=t.n(d);function g(){return g=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},g.apply(null,arguments)}const f=flarum.core.compat["admin/components/ExtensionPage"];var b=t.n(f);const y=flarum.core.compat["common/components/LoadingIndicator"];var h=t.n(y);const k=flarum.core.compat["common/components/Button"];var v=t.n(k);const _=flarum.core.compat["common/components/FieldSet"];var S=t.n(_),O=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).providerFields=void 0,e.status=void 0,e.testing=!1,e.testSuccessAlert=null,e}i(e,t);var s=e.prototype;return s.oninit=function(e){t.prototype.oninit.call(this,e),this.refresh()},s.refresh=function(){var t=this;this.loading=!0,this.status={errors:{}},p().request({method:"GET",url:p().forum.attribute("apiUrl")+"/issue-tracking/settings"}).then((function(e){t.providerFields=e.data.attributes.fields,t.status.errors=e.data.attributes.errors,t.loading=!1,m.redraw()}))},s.content=function(){var t=this;if(this.loading)return m(h(),null);var e=this.providerFields[this.setting("foskym-issue-tracking.provider")()].settings,s=Object.keys(e),n=Object.keys(this.providerFields).reduce((function(e,s){var n;return g({},e,((n={})[s]=t.providerFields[s].name,n))}),{});return m("div",{className:"container IssueTracking-container"},m("div",{className:"Form"},this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_create_issue",label:p().translator.trans("foskym-issue-tracking.admin.enable_create_issue_label")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_auto_import",label:p().translator.trans("foskym-issue-tracking.admin.enable_auto_import_label")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_comment_sync",label:p().translator.trans("foskym-issue-tracking.admin.enable_comment_sync_label")}),this.buildSettingComponent({type:"select",setting:"foskym-issue-tracking.provider",options:n,label:p().translator.trans("foskym-issue-tracking.admin.provider_heading")}),!!s.length&&m(S(),{label:p().translator.trans(this.setting("foskym-issue-tracking.provider")()+".admin.fields.heading"),className:"IssueTrackingPage-IssueTrackingSettings"},m("div",{className:"IssueTrackingPage-IssueTrackingSettings-input"},s.map((function(s){var n=e[s];return m("[",null,t.buildSettingComponent({type:"string"==typeof n?"text":"select",label:p().translator.trans(t.setting("foskym-issue-tracking.provider")()+".admin.fields."+s+"_label"),help:p().translator.trans(t.setting("foskym-issue-tracking.provider")()+".admin.fields."+s+"_help")===t.setting("foskym-issue-tracking.provider")()+".admin.fields."+s+"_help"?"":p().translator.trans(t.setting("foskym-issue-tracking.provider")()+".admin.fields."+s+"_help"),setting:t.setting("foskym-issue-tracking.provider")()+"."+s,options:n}),t.status.errors[s]&&m("p",{className:"ValidationError"},t.status.errors[s]))})))),this.submitButton(),m(S(),{label:p().translator.trans("foskym-issue-tracking.admin.action.heading"),className:"FieldSet--col IssueTrackingPage-IssueTrackingSettings"},m(v(),{className:"Button Button--primary",disabled:this.testing||this.isChanged(),onclick:function(){return t.testConnection()}},p().translator.trans("foskym-issue-tracking.admin.action.test_connection_button")))))},s.testConnection=function(){var t=this;this.testing=!0,this.testSuccessAlert&&p().alerts.dismiss(this.testSuccessAlert),p().request({method:"POST",url:p().forum.attribute("apiUrl")+"/issue-tracking/settings/test"}).then((function(e){t.testing=!1,t.testSuccessAlert=p().alerts.show({type:"success"},p().translator.trans("foskym-issue-tracking.admin.action.test_connection_success"))})).catch((function(e){throw t.testing=!1,m.redraw(),e}))},s.saveSettings=function(e){var s=this;return t.prototype.saveSettings.call(this,e).then((function(){return s.refresh()}))},e}(b());p().initializers.add("foskym/flarum-issue-tracking",(function(){p().extensionData.for("foskym-issue-tracking").registerPage(O)}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map