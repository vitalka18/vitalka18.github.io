import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AssetListComponent extends Component {
  @action
  onSelectAsset(asset) {
    this.args.selectAsset(asset);
  }
}
