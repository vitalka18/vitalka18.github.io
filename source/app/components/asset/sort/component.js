import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AssetSortComponent extends Component {
  get isAsc() {
    return this.args.sortDir === 'asc';
  }

  @action
  onSort(sortBy, sortDir) {
    this.args.sorted(sortBy, sortDir);
  }
}
