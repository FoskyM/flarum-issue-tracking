import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';

import IssuePage from './components/IssuePage';

import addLabels from './addLabels';

app.initializers.add('foskym/flarum-issue-tracking', () => {
  app.routes.issues = {
    path: '/issues',
    component: IssuePage,
  };

  extend(IndexPage.prototype, 'navItems', (navItems) => {
    navItems.add(
      'issues',
      <LinkButton href={app.route('issues')} icon="fab fa-github-alt">
        {app.translator.trans('foskym-issue-tracking.forum.title')}
      </LinkButton>,
      100
    );

    return navItems;
  });

  addLabels();
});
