import Extend from 'flarum/common/extenders';
import Issue from "./models/Issue";
import DiscussionIssue from './models/DiscussionIssue';

export default [
  new Extend.Store()
    .add('issue-tracking-issues', Issue)
    .add('issue-tracking-discussion-issue', DiscussionIssue),
];
