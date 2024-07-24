import Component from 'flarum/common/Component';
import type Mithril from 'mithril';

export default class Label extends Component {
  view(vnode: Mithril.Vnode) {
    let style = {};
    let className = ['IssueTracking-Label'];

    if (this.attrs.className) className.push(this.attrs.className);

    style.color = this.attrs.foreground || '#fff';

    if (this.attrs.background) {
      style.backgroundColor = `${this.attrs.background}`;
      className.push('colored');
    }

    return (
      <span className={className.join(' ')} style={style}>
        <span className="IssueTracking-Label-text">{vnode.children}</span>
      </span>
    );
  }
}