import Model from 'flarum/common/Model';

export default class Issue extends Model {
  id = Model.attribute('id');
  slug = Model.attribute('slug');
  title = Model.attribute('title');
  description = Model.attribute('description');
  author = Model.attribute('author');
  state = Model.attribute('state');
  priority = Model.attribute('priority');
  type = Model.attribute('type');
  created_at = Model.attribute('created_at', Model.transformDate);
  updated_at = Model.attribute('updated_at', Model.transformDate);
  resolved_at = Model.attribute('resolved_at', Model.transformDate);
  discussion = Model.hasOne('discussion');
  discussion_id = Model.attribute('discussion_id');
}
