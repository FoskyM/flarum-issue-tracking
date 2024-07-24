import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import LogInModal from 'flarum/forum/components/LogInModal';
import Button from 'flarum/common/components/Button';

import IssuePage from './components/IssuePage';
import IssueComposer from './components/IssueComposer';

import addLabels from './addLabels';

app.initializers.add('foskym/flarum-issue-tracking', () => {
  app.routes.issues = {
    path: '/issues',
    component: IssuePage,
  };

  extend(IndexPage.prototype, 'navItems', (navItems) => {
    navItems.add(
      'issues',
      <LinkButton href={app.route('issues')} icon="fas fa-tasks">
        {app.translator.trans('foskym-issue-tracking.forum.title')}
      </LinkButton>,
      100
    );

    return navItems;
  });

  function newIssueAction(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (app.session.user) {
        app.composer.load(IssueComposer, { user: app.session.user });
        app.composer.show();

        return resolve(app.composer);
      } else {
        app.modal.show(LogInModal);

        return reject();
      }
    });
  }

  extend(IndexPage.prototype, 'sidebarItems', function (items) {
    const route = app.current.data.routeName;
    if (route !== 'issues') return;

    const canCreateIssue = app.forum.attribute('foskym-issue-tracking.enable_create_issue') || !app.session.user;
    const cta = items.get('newDiscussion');
    cta.children = app.translator.trans(canCreateIssue ? 'foskym-issue-tracking.forum.new_issue' : 'foskym-issue-tracking.forum.cannot_create_issue');

    cta.attrs.disabled = !canCreateIssue;
    cta.attrs.onclick = () => {
      return newIssueAction().catch(() => {});
    };

    if (items.has('startDiscussion')) {
      items.setContent('startDiscussion', cta);
    }
  });

  addLabels();
});
