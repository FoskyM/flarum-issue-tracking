import Model from 'flarum/common/Model';

export default class DiscussionIssue extends Model {
  id = Model.attribute('id');
  discussion_id = Model.attribute('discussion_id');
  issue_id = Model.attribute('issue_id');
}
