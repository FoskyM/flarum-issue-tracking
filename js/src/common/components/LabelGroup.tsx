import Component from 'flarum/common/Component';
import type Mithril from 'mithril';

export default class LabelGroup extends Component {
  view(vnode: Mithril.Vnode) {
    let className = ['IssueTracking-LabelGroup'];

    if (this.attrs.className) className.push(this.attrs.className);

    return <span className={className.join(' ')}>{vnode.children}</span>;
  }
}