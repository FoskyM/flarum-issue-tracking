import app from 'flarum/common/app';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import humanTime from 'flarum/common/utils/humanTime';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import IssueList from './IssueList';

import type Mithril from 'mithril';

export default class IssuePage extends Page {
  loading = true;
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    app.setTitle(extractText(app.translator.trans('foskym-issue-tracking.forum.title')));
    app.setTitleCount(0);

    this.load();
  }

  view() {
    return (
      <div className="IndexPage">
        
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">
              {this.loading ? <LoadingIndicator /> : <IssueList/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  load() {
    this.loading = false;
  }
}