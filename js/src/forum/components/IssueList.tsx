import app from 'flarum/common/app';
import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';
import Dropdown from 'flarum/common/components/Dropdown';
import IssueListItem from './IssueListItem';

import type Mithril from 'mithril';

export default class IssueList extends Component {
  issues: any[] = [];
  loading = true;
  hasMore = true;
  sorts = ['newest', 'oldest', 'latest'];
  current_sort = 'latest';
  loadingNode = (<LoadingIndicator />);

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    this.refresh();
  }

  view() {
    const issuesVnodes: Mithril.Vnode[] = [];

    this.issues.forEach((issue) => {
      issuesVnodes.push(
        <li>
          <IssueListItem issue={issue} />
        </li>
      );
    });

    if (this.loading) {
      this.loadingNode = <LoadingIndicator />;
    } else if (this.hasMore) {
      this.loadingNode = (
        <Button className="Button" onclick={this.loadMore.bind(this)}>
          {app.translator.trans('core.forum.discussion_list.load_more_button')}
        </Button>
      );
    } else {
      this.loadingNode = <span></span>;
    }

    return (
      <div className="IssueTracking-issues">
        <div className="IndexPage-toolbar">
          <ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
          <ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
        </div>
        {this.loading && this.issues.length === 0 ? (
          <LoadingIndicator />
        ) : (
          <div className="IssueTracking-issuesContainer">
            <ul className="IssueTracking-issuesList">{issuesVnodes}</ul>

            <div className="DiscussionList-loadMore">{this.loadingNode}</div>
          </div>
        )}
      </div>
    );
  }

  refresh() {
    this.loading = true;
    this.issues = [];
    app.store
      .find('issue-tracking-issues', {
        sort: this.current_sort
      })
      .then((issues: any) => {
        this.hasMore = issues.length === 15;
        this.issues = issues;
        this.loading = false;
        m.redraw();
      });
  }

  loadMore() {
    this.loading = true;
    app.store
      .find('issue-tracking-issues', {
        sort: this.current_sort,
        offset: this.issues.length,
      })
      .then((issues: any) => {
        if (issues.length < 15) {
          this.hasMore = false;
        }
        this.issues = this.issues.concat(issues);
        this.loading = false;
        m.redraw();
      }
    );
  }

  changeState(sort: string) {
    this.current_sort = sort;
    this.refresh();
  }

  viewItems() {
    const items = new ItemList();

    items.add(
      'sort',
      <Dropdown buttonClassName="Button" label={app.translator.trans(`foskym-issue-tracking.forum.sort.${this.current_sort}_button`)}>
        {this.sorts.map((sort) => {
          const active = sort === this.current_sort;

          return (
            <Button icon={active ? 'fas fa-check' : ' '} onclick={this.changeState.bind(this, sort)} active={active}>
              {app.translator.trans(`foskym-issue-tracking.forum.sort.${sort}_button`)}
            </Button>
          );
        })}
      </Dropdown>
    );

    return items;
  }

  actionItems() {
    const items = new ItemList();

    items.add(
      'refresh',
      Button.component({
        title: app.translator.trans('core.forum.index.refresh_tooltip'),
        icon: 'fas fa-sync',
        className: 'Button Button--icon',
        onclick: this.refresh.bind(this),
      })
    );

    return items;
  }
}
