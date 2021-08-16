import Component from '@glimmer/component';
import { ASSET_TYPES } from '../../../constants/assets-type';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class AssetFilterComponent extends Component {
  filterTypes = A([
    {
      property: ASSET_TYPES.TEMPLATE,
      title: 'Template',
      icon: 'template',
      checked: true,
    },
    {
      property: ASSET_TYPES.IMAGE,
      title: 'Image',
      icon: 'image',
      checked: true,
    },
    {
      property: ASSET_TYPES.VIDEO,
      title: 'Video',
      icon: 'video',
      checked: true,
    },
    { property: ASSET_TYPES.PDF, title: 'PDF', icon: 'pdf', checked: true },
    { property: ASSET_TYPES.GIF, title: 'GIF', icon: 'gif', checked: true },
    {
      property: ASSET_TYPES.ARTICLE,
      title: 'Article',
      icon: 'link',
      checked: true,
    },
  ]);

  @action
  onFilterAssets(item, value) {
    item.checked = value;

    const filters = this.filterTypes.filterBy('checked').mapBy('property');
    this.args.filtered(filters);
  }
}
