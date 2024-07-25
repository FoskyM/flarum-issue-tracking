import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import DiscussionHero from 'flarum/forum/components/DiscussionHero';
import textContrastClass from 'flarum/common/helpers/textContrastClass';
import classList from 'flarum/common/utils/classList';
import Label from '../common/components/Label';
import LabelGroup from '../common/components/LabelGroup';

export default function () {
  let issue: any;
  let loading = true;
  extend(DiscussionHero.prototype, 'oninit', function () {
    app.store.find('issue-tracking/issue?id=' + this.attrs.discussion.id()).then((data: any) => {
      issue = data;
      loading = false;
      if (issue.id() !== null) {
        m.redraw();
      }
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
}
