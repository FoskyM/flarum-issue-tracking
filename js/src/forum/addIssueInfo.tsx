import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import DiscussionHero from 'flarum/forum/components/DiscussionHero';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import LinkButton from 'flarum/common/components/LinkButton';
import textContrastClass from 'flarum/common/helpers/textContrastClass';
import classList from 'flarum/common/utils/classList';
import Label from '../common/components/Label';
import LabelGroup from '../common/components/LabelGroup';

export default function () {
  let issue: any;
  let loading = true;
  extend(DiscussionHero.prototype, 'oninit', function () {
    if (this.attrs.discussion.data.relationships['discussion-issue'] === undefined) {
      return;
    }
    app.store.find('issue-tracking/issue?id=' + this.attrs.discussion.id()).then((data: any) => {
      issue = data;
      loading = false;
      if (issue.id() !== null) {
        m.redraw();
      }
    }).catch(() => {
      loading = false;
      issue = {};
    });
  });

  extend(DiscussionHero.prototype, 'items', function (items) {
    if (loading) {
      return;
    }
    if (issue.id() === null) {
      return;
    }
    items.add(
      'tags',
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
  });

  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    if (loading) {
      return;
    }
    if (issue.id() === null) {
      return;
    }
    items.add(
      'IssueLink',
      <LinkButton 
        className="Button Button--block"
        href={issue.link()}
        external={true} 
        icon="fas fa-bug"
      >
        {app.translator.trans('foskym-issue-tracking.forum.discussion.issue_link')}
      </LinkButton>
    );
  });
}
