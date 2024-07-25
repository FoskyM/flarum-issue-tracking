import app from 'flarum/common/app';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import humanTime from 'flarum/common/utils/humanTime';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import ProgressBar from '../../common/components/ProgressBar';
import IssueList from './IssueList';
import IssueHero from './IssueHero';

import type Mithril from 'mithril';

export default class IssuePage extends Page {
  loading = true;
  progress = 0;
  details: any = {
    resolved: 0,
    unresolved: 0,
    total: 0,
    updated_at: 0,
  };
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    app.setTitle(extractText(app.translator.trans('foskym-issue-tracking.forum.title')));
    app.setTitleCount(0);

    this.load();
  }

  view() {
    return (
      <div className="IndexPage">
        {this.loading ? (
          <IssueHero title={<LoadingIndicator />} />
        ) : (
          <IssueHero
            title={app.translator.trans('foskym-issue-tracking.forum.title')}
            subtitle={[
              <div className="IssueTracking-details">{listItems(this.issueTrackingDetails().toArray())}</div>,
              <ProgressBar fancy={true} alternate={true} progress={this.progress} />,
            ]}
          />
        )}
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">{this.loading ? <LoadingIndicator /> : <IssueList />}</div>
          </div>
        </div>
      </div>
    );
  }

  issueTrackingDetails() {
    const items = new ItemList();

    items.add(
      'updatedAt',
      <div className="IssueTracking-detailsItem">
        <strong>{icon('fas fa-clock')}</strong>{' '}
        {app.translator.trans('foskym-issue-tracking.forum.hero.last_updated', { time: humanTime(this.details.updated_at) })}
      </div>
    );

    items.add(
      'openIssues',
      <div className="IssueTracking-detailsItem">
        <strong>{this.details.resolved}</strong> {app.translator.trans('foskym-issue-tracking.forum.hero.resolved')}
      </div>
    );

    items.add(
      'closedIssues',
      <div className="IssueTracking-detailsItem">
        <strong>{this.details.unresolved}</strong> {app.translator.trans('foskym-issue-tracking.forum.hero.unresolved')}
      </div>
    );

    items.add(
      'progress',
      <div className="IssueTracking-detailsItem">
        <strong>{this.progress}%</strong> {app.translator.trans('foskym-issue-tracking.forum.hero.complete')}
      </div>
    );

    return items;
  }

  load() {
    this.loading = false;

    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/issue-tracking/progress',
    }).then((response: any) => {
      this.details = response;
      this.progress = Math.round((this.details.resolved / (this.details.total)) * 100);
      m.redraw();
    });
  }
}
