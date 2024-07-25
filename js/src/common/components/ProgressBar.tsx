import Component from 'flarum/common/Component';

export default class ProgressBar extends Component {
  view() {
    let className = ['IssueTracking-ProgressBar'];

    if (this.attrs.className) className.push(this.attrs.className);

    if (this.attrs.mini) className.push('IssueTracking-ProgressBar--mini');

    if (this.attrs.fancy) className.push('IssueTracking-ProgressBar--fancy');

    if (this.attrs.alternate) className.push('IssueTracking-ProgressBar--alternate');

    return (
      <div className={className.join(' ')}>
        <div className="IssueTracking-ProgressBar-bar" style={{ width: `${this.getProgress()}%` }} />
      </div>
    );
  }

  getProgress() {
    return this.attrs.progress;
  }
}