import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UiDropdownComponent extends Component {
  get isLoadMoreVisible() {
    return this.args.page * this.args.perPage < this.args.totalCount;
  }

  get pages() {
    return this.args.page + 1;
  }

  @action
  onLoadMore() {
    this.args.loadMore(this.args.page + 1);
  }
}
