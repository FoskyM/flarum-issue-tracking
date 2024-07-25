import app from 'flarum/common/app';
import Component from 'flarum/common/Component';
import humanTime from 'flarum/common/utils/humanTime';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';
import Tooltip from 'flarum/common/components/Tooltip';
import Link from 'flarum/common/components/Link';
import TerminalPost from 'flarum/forum/components/TerminalPost';
import icon from 'flarum/common/helpers/icon';
import avatar from 'flarum/common/helpers/avatar';
import abbreviateNumber from 'flarum/common/utils/abbreviateNumber';
import Label from '../../common/components/Label';
import LabelGroup from '../../common/components/LabelGroup';
import ProgressBar from '../../common/components/ProgressBar';

import type Mithril from 'mithril';
export default class IssueListItem extends Component {
  view() {
    const issue = this.attrs.issue;
    const discussion = issue.discussion();
    const user = discussion.user();

    return (
      <div className="DiscussionListItem">
        <div className="DiscussionListItem-content">
          <Tooltip
            text={app.translator.trans('core.forum.discussion_list.started_text', { user, ago: humanTime(discussion.createdAt()) })}
            position="right"
          >
            <Link className="DiscussionListItem-author" href={user ? app.route.user(user) : '#'}>
              {avatar(user || null, { title: '' })}
            </Link>
          </Tooltip>
          <ul className="DiscussionListItem-badges badges">{listItems(this.badgeItems(issue).toArray())}</ul>

          <Link href={app.route.discussion(discussion, this.getJumpTo())} className="DiscussionListItem-main">
            <h2 className="DiscussionListItem-title">{discussion.title()}</h2>
            <ul className="DiscussionListItem-info">{listItems(this.infoItems(issue).toArray())}</ul>
          </Link>

          <span className="DiscussionListItem-count">
            <span aria-hidden="true">{abbreviateNumber(issue.discussion().replyCount())}</span>

            <span className="visually-hidden">
              {app.translator.trans('core.forum.discussion_list.total_replies_a11y_label', { count: issue.discussion().replyCount() })}
            </span>
          </span>
        </div>
      </div>
    );
  }

  getJumpTo() {
    const issue = this.attrs.issue;
    const discussion = issue.discussion();
    const user = discussion.user();
    let jumpTo = 0;

    jumpTo = Math.min(discussion.lastPostNumber() ?? 0, (discussion.lastReadPostNumber() || 0) + 1);

    return jumpTo;
  }

  badgeItems(issue: any) {
    const items = new ItemList();

    let is_resolved = issue.is_resolved();
    let progress = issue.progress();
    let icon = is_resolved ? 'far fa-check-circle' : progress > 0 ? 'far fa-circle' : 'far fa-stop-circle';
    let color = is_resolved ? '#4CAF50' : progress > 0 ? '#FFC107' : '#F44336';

    items.add(
      'state',
      <span className={`Badge IssueTracking-Badge`} style={{ backgroundColor: color }}>
        <i className={'icon ' + icon}></i>
      </span>
    );

    return items;
  }

  infoItems(issue: any) {
    const items = new ItemList();

    items.add(
      'terminalPost',
      <div>
        <span>#{issue.id()}</span>
        <span>
          {app.translator.trans('foskym-issue-tracking.forum.issue_opened_by', {
            time: humanTime(issue.created_at()),
            username: issue.discussion().user().displayName(),
          })}
        </span>
        <span>
          {icon('far fa-clock')} {app.translator.trans('foskym-issue-tracking.forum.last_updated', { time: humanTime(issue.updated_at()) })}
        </span>
      </div>
    );

    if (issue.progress() > 0 && issue.progress() < 1) {
      items.add(
        'progress',
        <span>
          {icon('fas fa-tasks')} {app.translator.trans('foskym-issue-tracking.forum.progress')}
          <ProgressBar progress={issue.progress() * 100} mini={true} />
        </span>
      );
    }

    items.add(
      'labels',
      <LabelGroup>
        {['state', 'type', 'priority'].map((key) => {
          return (
            <Label background={issue[key]().background} foreground={issue[key]().foreground}>
              {issue[key]().name}
            </Label>
          );
        })}
      </LabelGroup>
    );

    return items;
  }
}
