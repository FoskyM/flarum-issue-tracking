(()=>{var t={n:s=>{var e=s&&s.__esModule?()=>s.default:()=>s;return t.d(e,{a:e}),e},d:(s,e)=>{for(var r in e)t.o(e,r)&&!t.o(s,r)&&Object.defineProperty(s,r,{enumerable:!0,get:e[r]})},o:(t,s)=>Object.prototype.hasOwnProperty.call(t,s),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},s={};(()=>{"use strict";t.r(s),t.d(s,{extend:()=>l});const e=flarum.core.compat["common/extenders"];var r=t.n(e);function o(t,s){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,s){return t.__proto__=s,t},o(t,s)}function a(t,s){t.prototype=Object.create(s.prototype),t.prototype.constructor=t,o(t,s)}const n=flarum.core.compat["common/Model"];var i=t.n(n),c=function(t){function s(){for(var s,e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return(s=t.call.apply(t,[this].concat(r))||this).id=i().attribute("id"),s.slug=i().attribute("slug"),s.title=i().attribute("title"),s.description=i().attribute("description"),s.author=i().attribute("author"),s.state=i().attribute("state"),s.priority=i().attribute("priority"),s.type=i().attribute("type"),s.created_at=i().attribute("created_at",i().transformDate),s.updated_at=i().attribute("updated_at",i().transformDate),s.resolved_at=i().attribute("resolved_at",i().transformDate),s.is_resolved=i().attribute("is_resolved"),s.progress=i().attribute("progress"),s.discussion=i().hasOne("discussion"),s.discussion_id=i().attribute("discussion_id"),s}return a(s,t),s}(i()),u=function(t){function s(){for(var s,e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return(s=t.call.apply(t,[this].concat(r))||this).id=i().attribute("id"),s.discussion_id=i().attribute("discussion_id"),s.issue_id=i().attribute("issue_id"),s}return a(s,t),s}(i());const l=[(new(r().Store)).add("issue-tracking-issues",c).add("issue-tracking-discussion-issue",u)],d=flarum.core.compat["forum/app"];var p=t.n(d);const f=flarum.core.compat["common/extend"],h=flarum.core.compat["forum/components/IndexPage"];var g=t.n(h);const v=flarum.core.compat["common/components/LinkButton"];var y=t.n(v);const k=flarum.core.compat["forum/components/LogInModal"];var b=t.n(k);const _=flarum.core.compat["common/app"];var N=t.n(_);const I=flarum.core.compat["common/components/Page"];var w=t.n(I);const T=flarum.core.compat["common/helpers/listItems"];var P=t.n(T);const x=flarum.core.compat["common/utils/ItemList"];var D=t.n(x);const L=flarum.core.compat["common/components/LoadingIndicator"];var C=t.n(L);const A=flarum.core.compat["common/utils/humanTime"];var B=t.n(A);const O=flarum.core.compat["common/helpers/icon"];var j=t.n(O);const S=flarum.core.compat["common/utils/extractText"];var M=t.n(S);const F=flarum.core.compat["common/Component"];var E=t.n(F),H=function(t){function s(){return t.apply(this,arguments)||this}a(s,t);var e=s.prototype;return e.view=function(){var t=["IssueTracking-ProgressBar"];return this.attrs.className&&t.push(this.attrs.className),this.attrs.mini&&t.push("IssueTracking-ProgressBar--mini"),this.attrs.fancy&&t.push("IssueTracking-ProgressBar--fancy"),this.attrs.alternate&&t.push("IssueTracking-ProgressBar--alternate"),m("div",{className:t.join(" ")},m("div",{className:"IssueTracking-ProgressBar-bar",style:{width:this.getProgress()+"%"}}))},e.getProgress=function(){return this.attrs.progress},s}(E());const G=flarum.core.compat["common/components/Button"];var J=t.n(G);const R=flarum.core.compat["common/components/Dropdown"];var q=t.n(R);const z=flarum.core.compat["common/components/Tooltip"];var U=t.n(z);const K=flarum.core.compat["common/components/Link"];var Q=t.n(K);const V=flarum.core.compat["common/helpers/avatar"];var W=t.n(V);const X=flarum.core.compat["common/utils/abbreviateNumber"];var Y=t.n(X),Z=function(t){function s(){return t.apply(this,arguments)||this}return a(s,t),s.prototype.view=function(t){var s={},e=["IssueTracking-Label"];return this.attrs.className&&e.push(this.attrs.className),s.color=this.attrs.foreground||"#fff",this.attrs.background&&(s.backgroundColor=""+this.attrs.background,e.push("colored")),m("span",{className:e.join(" "),style:s},m("span",{className:"IssueTracking-Label-text"},t.children))},s}(E()),$=function(t){function s(){return t.apply(this,arguments)||this}return a(s,t),s.prototype.view=function(t){var s=["IssueTracking-LabelGroup"];return this.attrs.className&&s.push(this.attrs.className),m("span",{className:s.join(" ")},t.children)},s}(E()),tt=function(t){function s(){return t.apply(this,arguments)||this}a(s,t);var e=s.prototype;return e.view=function(){var t=this.attrs.issue,s=t.discussion(),e=s.user();return m("div",{className:"DiscussionListItem"},m("div",{className:"DiscussionListItem-content"},m(U(),{text:N().translator.trans("core.forum.discussion_list.started_text",{user:e,ago:B()(s.createdAt())}),position:"right"},m(Q(),{className:"DiscussionListItem-author",href:e?N().route.user(e):"#"},W()(e||null,{title:""}))),m("ul",{className:"DiscussionListItem-badges badges"},P()(this.badgeItems(t).toArray())),m(Q(),{href:N().route.discussion(s,this.getJumpTo()),className:"DiscussionListItem-main"},m("h2",{className:"DiscussionListItem-title"},s.title()),m("ul",{className:"DiscussionListItem-info"},P()(this.infoItems(t).toArray()))),m("span",{className:"DiscussionListItem-count"},m("span",{"aria-hidden":"true"},Y()(t.discussion().replyCount())),m("span",{className:"visually-hidden"},N().translator.trans("core.forum.discussion_list.total_replies_a11y_label",{count:t.discussion().replyCount()})))))},e.getJumpTo=function(){var t,s=this.attrs.issue.discussion();return s.user(),Math.min(null!=(t=s.lastPostNumber())?t:0,(s.lastReadPostNumber()||0)+1)},e.badgeItems=function(t){var s=new(D()),e=t.is_resolved(),r=t.progress(),o=e?"far fa-check-circle":r>0?"far fa-circle":"far fa-stop-circle",a=e?"#4CAF50":r>0?"#FFC107":"#F44336";return s.add("state",m("span",{className:"Badge IssueTracking-Badge",style:{backgroundColor:a}},m("i",{className:"icon "+o}))),s},e.infoItems=function(t){var s=new(D());return s.add("terminalPost",m("div",null,m("span",null,"#",t.id()),m("span",null,N().translator.trans("foskym-issue-tracking.forum.issue_opened_by",{time:B()(t.created_at()),username:t.discussion().user().displayName()})),m("span",null,j()("far fa-clock")," ",N().translator.trans("foskym-issue-tracking.forum.last_updated",{time:B()(t.updated_at())})))),t.progress()>0&&t.progress()<1&&s.add("progress",m("span",null,j()("fas fa-tasks")," ",N().translator.trans("foskym-issue-tracking.forum.progress"),m(H,{progress:100*t.progress(),mini:!0}))),s.add("labels",m($,null,["state","type","priority"].map((function(s){return m(Z,{background:t[s]().background,foreground:t[s]().foreground},t[s]().name)})))),s},s}(E()),st=function(t){function s(){for(var s,e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return(s=t.call.apply(t,[this].concat(r))||this).issues=[],s.loading=!0,s.sorts=["newest","oldest","latest"],s.current_sort="latest",s}a(s,t);var e=s.prototype;return e.oninit=function(s){t.prototype.oninit.call(this,s),this.refresh()},e.view=function(){var t=[];return this.issues.forEach((function(s){t.push(m("li",null,m(tt,{issue:s})))})),m("div",{className:"IssueTracking-issues"},m("div",{className:"IndexPage-toolbar"},m("ul",{className:"IndexPage-toolbar-view"},P()(this.viewItems().toArray())),m("ul",{className:"IndexPage-toolbar-action"},P()(this.actionItems().toArray()))),this.loading?m(C(),null):m("div",{className:"IssueTracking-issuesContainer"},m("ul",{className:"IssueTracking-issuesList"},t)))},e.refresh=function(){var t=this;this.loading=!0,this.issues=[],N().store.find("issue-tracking-issues",{sort:this.current_sort}).then((function(s){t.issues=s,t.loading=!1,m.redraw()}))},e.changeState=function(t){this.current_sort=t,this.refresh()},e.viewItems=function(){var t=this,s=new(D());return s.add("sort",m(q(),{buttonClassName:"Button",label:N().translator.trans("foskym-issue-tracking.forum.sort."+this.current_sort+"_button")},this.sorts.map((function(s){var e=s===t.current_sort;return m(J(),{icon:e?"fas fa-check":" ",onclick:t.changeState.bind(t,s),active:e},N().translator.trans("foskym-issue-tracking.forum.sort."+s+"_button"))})))),s},e.actionItems=function(){var t=new(D());return t.add("refresh",J().component({title:N().translator.trans("core.forum.index.refresh_tooltip"),icon:"fas fa-sync",className:"Button Button--icon",onclick:this.refresh.bind(this)})),t},s}(E()),et=function(t){function s(){return t.apply(this,arguments)||this}return a(s,t),s.prototype.view=function(){var t=this.attrs.title,s=this.attrs.subtitle;return delete this.attrs.title,delete this.attrs.subtitle,this.attrs.className="Hero "+(this.attrs.className||""),m("header",this.attrs,m("div",{className:"container"},m("div",{className:"containerNarrow"},m("h2",{className:"Hero-title"},t),m("div",{className:"Hero-subtitle"},s))))},s}(E()),rt=function(t){function s(){for(var s,e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return(s=t.call.apply(t,[this].concat(r))||this).loading=!0,s.progress=0,s.details={resolved:0,unresolved:0,total:0,updated_at:0},s}a(s,t);var e=s.prototype;return e.oninit=function(s){t.prototype.oninit.call(this,s),N().history.push("issues",N().translator.trans("foskym-issue-tracking.forum.header.back_to_issues_tooltip")),N().setTitle(M()(N().translator.trans("foskym-issue-tracking.forum.title"))),N().setTitleCount(0),this.load()},e.view=function(){return m("div",{className:"IndexPage"},this.loading?m(et,{title:m(C(),null)}):m(et,{title:N().translator.trans("foskym-issue-tracking.forum.title"),subtitle:[m("div",{className:"IssueTracking-details"},P()(this.issueTrackingDetails().toArray())),m(H,{fancy:!0,alternate:!0,progress:this.progress})]}),m("div",{className:"container"},m("div",{className:"sideNavContainer"},m("nav",{className:"IndexPage-nav sideNav"},m("ul",null,P()(g().prototype.sidebarItems().toArray()))),m("div",{className:"IndexPage-results sideNavOffset"},this.loading?m(C(),null):m(st,null)))))},e.issueTrackingDetails=function(){var t=new(D());return t.add("updatedAt",m("div",{className:"IssueTracking-detailsItem"},m("strong",null,j()("fas fa-clock"))," ",N().translator.trans("foskym-issue-tracking.forum.hero.last_updated",{time:B()(this.details.updated_at)}))),t.add("openIssues",m("div",{className:"IssueTracking-detailsItem"},m("strong",null,this.details.resolved)," ",N().translator.trans("foskym-issue-tracking.forum.hero.resolved"))),t.add("closedIssues",m("div",{className:"IssueTracking-detailsItem"},m("strong",null,this.details.unresolved)," ",N().translator.trans("foskym-issue-tracking.forum.hero.unresolved"))),t.add("progress",m("div",{className:"IssueTracking-detailsItem"},m("strong",null,this.progress,"%")," ",N().translator.trans("foskym-issue-tracking.forum.hero.complete"))),t},e.load=function(){var t=this;this.loading=!1,N().request({method:"GET",url:N().forum.attribute("apiUrl")+"/issue-tracking/progress"}).then((function(s){t.details=s,t.progress=Math.round(t.details.resolved/t.details.total*100),m.redraw()}))},s}(w());const ot=flarum.core.compat["common/components/ComposerBody"];var at=t.n(ot);const nt=flarum.core.compat["common/utils/Stream"];var it=t.n(nt),ct=function(t){function s(){return t.apply(this,arguments)||this}a(s,t),s.initAttrs=function(s){t.initAttrs.call(this,s),s.placeholder=s.placeholder||M()(N().translator.trans("foskym-issue-tracking.forum.composer.body_placeholder")),s.submitLabel=s.submitLabel||N().translator.trans("foskym-issue-tracking.forum.composer.submit_button"),s.confirmExit=s.confirmExit||M()(N().translator.trans("foskym-issue-tracking.forum.composer.discard_confirmation")),s.titlePlaceholder=s.titlePlaceholder||M()(N().translator.trans("foskym-issue-tracking.forum.composer.title_placeholder")),s.className="ComposerBody--issue"};var e=s.prototype;return e.oninit=function(s){t.prototype.oninit.call(this,s),this.composer.fields.title=this.composer.fields.title||it()(""),this.title=this.composer.fields.title},e.headerItems=function(){var s=t.prototype.headerItems.call(this);return s.add("issueTitle",m("h3",null,m("input",{className:"FormControl",bidi:this.title,placeholder:this.attrs.titlePlaceholder,disabled:!!this.attrs.disabled,onkeydown:this.onkeydown.bind(this)}))),s},e.onkeydown=function(t){13===t.which&&(t.preventDefault(),this.composer.editor.moveCursorTo(0)),t.redraw=!1},e.hasChanges=function(){return this.title()||this.composer.fields.content()},e.data=function(){return{title:this.title(),content:this.composer.fields.content()}},e.onsubmit=function(){var t=this;this.loading=!0;var s=this.data();N().store.createRecord("issue-tracking-issues").save(s).then((function(s){t.composer.hide(),m.route.set("/d/"+s.discussion_id())}),this.loaded.bind(this))},s}(at());const ut=flarum.core.compat["forum/components/DiscussionHero"];var lt=t.n(ut);p().initializers.add("foskym/flarum-issue-tracking",(function(){var t,s;p().routes.issues={path:"/issues",component:rt},(0,f.extend)(g().prototype,"navItems",(function(t){return t.add("issues",m(y(),{href:p().route("issues"),icon:"fas fa-bug"},p().translator.trans("foskym-issue-tracking.forum.title")),100),t})),(0,f.extend)(g().prototype,"sidebarItems",(function(t){if("issues"===p().current.data.routeName){var s=p().forum.attribute("foskym-issue-tracking.enable_create_issue")||!p().session.user,e=t.get("newDiscussion");e.children=p().translator.trans(s?"foskym-issue-tracking.forum.new_issue":"foskym-issue-tracking.forum.cannot_create_issue"),e.attrs.disabled=!s,e.attrs.onclick=function(){return new Promise((function(t,s){return p().session.user?(p().composer.load(ct,{user:p().session.user}),p().composer.show(),t(p().composer)):(p().modal.show(b()),s())})).catch((function(){}))},t.has("startDiscussion")&&t.setContent("startDiscussion",e)}})),s=!0,(0,f.extend)(lt().prototype,"oninit",(function(){p().store.find("issue-tracking/issue?id="+this.attrs.discussion.id()).then((function(e){s=!1,null!==(t=e).id()&&m.redraw()}))})),(0,f.extend)(lt().prototype,"items",(function(e){s||null!==t.id()&&e.add("tags",m($,null,["state","type","priority"].map((function(s){return m(Z,{background:t[s]().background,foreground:t[s]().foreground},t[s]().name)}))))}))}))})(),module.exports=s})();
//# sourceMappingURL=forum.js.map