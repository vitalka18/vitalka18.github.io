import Model, { attr } from '@ember-data/model';
import { fragment, array } from 'ember-data-model-fragments/attributes';

import { ASSET_TYPES } from '../constants/assets-type';

export default class AssetModel extends Model {
  @attr('number') createdAt;
  @attr('string') description;
  @fragment('asset-link') externalLink;
  @attr('string') originalFileSrc;
  @attr('string') previewImage;
  @attr('number') usedTotalCount;
  @attr('boolean') selected;
  @array('string') tags;
  @attr('string') title;
  @attr('number') type;

  get typeName() {
    switch (this.type) {
      case ASSET_TYPES.TEMPLATE:
        return 'template';
      case ASSET_TYPES.GIF:
        return 'gif';
      case ASSET_TYPES.PDF:
        return 'pdf';
      case ASSET_TYPES.IMAGE:
        return 'image';
      case ASSET_TYPES.VIDEO:
        return 'video';
      case ASSET_TYPES.ARTICLE:
        return 'link';
      default:
        return '';
    }
  }
}
