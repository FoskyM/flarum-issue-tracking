(()=>{var t={n:e=>{var s=e&&e.__esModule?()=>e.default:()=>e;return t.d(s,{a:s}),s},d:(e,s)=>{for(var n in s)t.o(s,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:s[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>l});const s=flarum.core.compat["common/extenders"];var n=t.n(s);function i(t,e){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},i(t,e)}function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,i(t,e)}const a=flarum.core.compat["common/Model"];var o=t.n(a),u=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))||this).id=o().attribute("id"),e.slug=o().attribute("slug"),e.title=o().attribute("title"),e.description=o().attribute("description"),e.author=o().attribute("author"),e.state=o().attribute("state"),e.priority=o().attribute("priority"),e.type=o().attribute("type"),e.created_at=o().attribute("created_at",o().transformDate),e.updated_at=o().attribute("updated_at",o().transformDate),e.resolved_at=o().attribute("resolved_at",o().transformDate),e.is_resolved=o().attribute("is_resolved"),e.progress=o().attribute("progress"),e.link=o().attribute("link"),e.discussion=o().hasOne("discussion"),e.discussion_id=o().attribute("discussion_id"),e}return r(e,t),e}(o()),c=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))||this).id=o().attribute("id"),e.discussion_id=o().attribute("discussion_id"),e.issue_id=o().attribute("issue_id"),e}return r(e,t),e}(o());const l=[(new(n().Store)).add("issue-tracking-issues",u).add("issue-tracking-discussion-issue",c)],d=flarum.core.compat["admin/app"];var p=t.n(d);function f(){return f=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},f.apply(null,arguments)}const g=flarum.core.compat["admin/components/ExtensionPage"];var b=t.n(g);const k=flarum.core.compat["common/components/LoadingIndicator"];var _=t.n(k);const y=flarum.core.compat["common/components/Button"];var h=t.n(y);const v=flarum.core.compat["common/components/FieldSet"];var w=t.n(v);const S=flarum.core.compat["common/helpers/icon"];var O=t.n(S);const I=flarum.core.compat["common/utils/extractText"];var T=t.n(I),P=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))||this).providerFields=void 0,e.status=void 0,e.testing=!1,e.testSuccessAlert=null,e}r(e,t);var s=e.prototype;return s.oninit=function(e){t.prototype.oninit.call(this,e),this.refresh()},s.refresh=function(){var t=this;this.loading=!0,this.status={errors:{}},p().request({method:"GET",url:p().forum.attribute("apiUrl")+"/issue-tracking/settings"}).then((function(e){t.providerFields=e.data.attributes.fields,t.status.errors=e.data.attributes.errors,t.loading=!1,m.redraw()}))},s.content=function(){var t,e=this;if(this.loading)return m(_(),null);var s=(null==(t=this.providerFields[this.setting("foskym-issue-tracking.provider")()])?void 0:t.settings)||{},n=Object.keys(s),i=Object.keys(this.providerFields).reduce((function(t,s){var n;return f({},t,((n={})[s]=e.providerFields[s].name,n))}),{});return m("div",{className:"container IssueTracking-container"},m("div",{className:"Form"},this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_create_issue",label:p().translator.trans("foskym-issue-tracking.admin.enable_create_issue_label")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_auto_import",label:p().translator.trans("foskym-issue-tracking.admin.enable_auto_import_label"),help:p().translator.trans("foskym-issue-tracking.admin.default_import_by_email_help")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_import_by_username",label:p().translator.trans("foskym-issue-tracking.admin.enable_import_by_username_label")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_import_by_display_name",label:p().translator.trans("foskym-issue-tracking.admin.enable_import_by_display_name_label")}),this.buildSettingComponent({type:"boolean",setting:"foskym-issue-tracking.enable_comment_sync",label:p().translator.trans("foskym-issue-tracking.admin.enable_comment_sync_label")}),this.buildSettingComponent({type:"select",setting:"foskym-issue-tracking.provider",options:i,label:p().translator.trans("foskym-issue-tracking.admin.provider_heading")}),!!n.length&&m(w(),{label:p().translator.trans(this.setting("foskym-issue-tracking.provider")()+".admin.fields.heading"),className:"IssueTrackingPage-IssueTrackingSettings"},m("div",{className:"IssueTrackingPage-IssueTrackingSettings-input"},n.map((function(t){var n=s[t];return m("[",null,e.buildSettingComponent({type:"string"==typeof n?"text":"select",label:p().translator.trans(e.setting("foskym-issue-tracking.provider")()+".admin.fields."+t+"_label"),help:p().translator.trans(e.setting("foskym-issue-tracking.provider")()+".admin.fields."+t+"_help")===e.setting("foskym-issue-tracking.provider")()+".admin.fields."+t+"_help"?"":p().translator.trans(e.setting("foskym-issue-tracking.provider")()+".admin.fields."+t+"_help"),setting:e.setting("foskym-issue-tracking.provider")()+"."+t,options:n}),e.status.errors[t]&&m("p",{className:"ValidationError"},e.status.errors[t]))})))),this.submitButton(),m(w(),{label:p().translator.trans("foskym-issue-tracking.admin.action.heading"),className:"FieldSet--col IssueTrackingPage-IssueTrackingSettings"},m(h(),{className:"Button Button--primary",disabled:this.testing||this.isChanged(),onclick:function(){return e.testConnection()}},p().translator.trans("foskym-issue-tracking.admin.action.test_connection_button")),m(h(),{className:"Button Button--primary",onclick:function(){return e.importIssues()}},O()("fas fa-download"),p().translator.trans("foskym-issue-tracking.admin.action.import_issues_button")),m(h(),{className:"Button Button--primary",onclick:function(){return e.deleteImportedIssues()}},O()("fas fa-trash-alt"),p().translator.trans("foskym-issue-tracking.admin.action.delete_imported_issues_button")),m(h(),{className:"Button Button--danger",onclick:function(){return e.deleteAllIssues()}},O()("fas fa-trash-alt"),p().translator.trans("foskym-issue-tracking.admin.action.delete_all_issues_button")))))},s.importIssues=function(){window.confirm(T()(p().translator.trans("foskym-issue-tracking.admin.action.import_issues_confirmation")))&&p().request({method:"POST",url:p().forum.attribute("apiUrl")+"/issue-tracking/issues/import"}).then((function(){p().alerts.show({type:"success"},p().translator.trans("foskym-issue-tracking.admin.action.import_issues_success"))})).catch((function(t){throw m.redraw(),t}))},s.deleteImportedIssues=function(){window.confirm(T()(p().translator.trans("foskym-issue-tracking.admin.action.delete_imported_issues_confirmation")))&&p().request({method:"DELETE",url:p().forum.attribute("apiUrl")+"/issue-tracking/issues/imported"}).then((function(){p().alerts.show({type:"success"},p().translator.trans("foskym-issue-tracking.admin.action.delete_imported_issues_success"))})).catch((function(t){throw m.redraw(),t}))},s.deleteAllIssues=function(){window.confirm(T()(p().translator.trans("foskym-issue-tracking.admin.action.delete_all_issues_confirmation")))&&p().request({method:"DELETE",url:p().forum.attribute("apiUrl")+"/issue-tracking/issues"}).then((function(){p().alerts.show({type:"success"},p().translator.trans("foskym-issue-tracking.admin.action.delete_all_issues_success"))})).catch((function(t){throw m.redraw(),t}))},s.testConnection=function(){var t=this;this.testing=!0,this.testSuccessAlert&&p().alerts.dismiss(this.testSuccessAlert),p().request({method:"POST",url:p().forum.attribute("apiUrl")+"/issue-tracking/settings/test"}).then((function(e){t.testing=!1,t.testSuccessAlert=p().alerts.show({type:"success"},p().translator.trans("foskym-issue-tracking.admin.action.test_connection_success"))})).catch((function(e){throw t.testing=!1,m.redraw(),e}))},s.saveSettings=function(e){var s=this;return t.prototype.saveSettings.call(this,e).then((function(){return s.refresh()}))},e}(b());p().initializers.add("foskym/flarum-issue-tracking",(function(){p().extensionData.for("foskym-issue-tracking").registerPage(P)}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map