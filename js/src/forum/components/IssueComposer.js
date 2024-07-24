import ComposerBody from 'flarum/common/components/ComposerBody';
import extractText from 'flarum/common/utils/extractText';
import app from 'flarum/common/app';
import Stream from 'flarum/common/utils/Stream';

export default class IssueComposer extends ComposerBody {
  static initAttrs(attrs) {
    super.initAttrs(attrs);

    attrs.placeholder = attrs.placeholder || extractText(app.translator.trans('foskym-issue-tracking.forum.composer.body_placeholder'));
    attrs.submitLabel = attrs.submitLabel || app.translator.trans('foskym-issue-tracking.forum.composer.submit_button');
    attrs.confirmExit = attrs.confirmExit || extractText(app.translator.trans('foskym-issue-tracking.forum.composer.discard_confirmation'));
    attrs.titlePlaceholder = attrs.titlePlaceholder || extractText(app.translator.trans('foskym-issue-tracking.forum.composer.title_placeholder'));
    attrs.className = 'ComposerBody--issue';
  }

  oninit(vnode) {
    super.oninit(vnode);

    this.composer.fields.title = this.composer.fields.title || Stream('');

    this.title = this.composer.fields.title;
  }

  headerItems() {
    const items = super.headerItems();

    // items.add('title', <h3>{app.translator.trans('foskym-issue-tracking.forum.composer.title')}</h3>, 100);

    items.add(
      'issueTitle',
      <h3>
        <input
          className="FormControl"
          bidi={this.title}
          placeholder={this.attrs.titlePlaceholder}
          disabled={!!this.attrs.disabled}
          onkeydown={this.onkeydown.bind(this)}
        />
      </h3>
    );

    return items;
  }

  /**
   * Handle the title input's keydown event. When the return key is pressed,
   * move the focus to the start of the text editor.
   *
   * @param {KeyboardEvent} e
   */
  onkeydown(e) {
    if (e.which === 13) {
      // Return
      e.preventDefault();
      this.composer.editor.moveCursorTo(0);
    }

    e.redraw = false;
  }

  hasChanges() {
    return this.title() || this.composer.fields.content();
  }

  /**
   * Get the data to submit to the server when the issue is saved.
   *
   * @return {Record<string, unknown>}
   */
  data() {
    return {
      title: this.title(),
      content: this.composer.fields.content(),
    };
  }

  onsubmit() {
    this.loading = true;

    const data = this.data();

    app.store
      .createRecord('issue-tracking-issues')
      .save(data)
      .then((issue) => {
        this.composer.hide();
        m.route.set('/d/' + issue.discussion_id());
      }, this.loaded.bind(this));
  }
}
