import Component from '@glimmer/component';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { ASSET_FALLBACK } from '../../../constants/default-links';
import { ASSET_TYPES } from '../../../constants/assets-type';

export default class AssetCardComponent extends Component {
  @tracked canNotLoadImage = false;
  @tracked focused = false;
  @tracked hovered = false;
  fallbackImage = ASSET_FALLBACK;

  get additionalTags() {
    if (this.args.asset && this.args.asset.tags) {
      return this.args.asset.tags.slice(1);
    }
    return A([]);
  }

  get hasDownloadLink() {
    return this.args.asset.type === ASSET_TYPES.PDF;
  }

  get hasLink() {
    return this.args.asset.type === ASSET_TYPES.ARTICLE;
  }

  get hasUseButton() {
    return (
      this.args.asset.type !== ASSET_TYPES.PDF &&
      this.args.asset.type !== ASSET_TYPES.ARTICLE
    );
  }

  @action
  onSelect() {
    this.args.selected(this.args.asset);
  }

  @action
  onFavorite() {
    this.args.asset.selected = !this.args.asset.selected;
  }

  @action
  onImageLoadError() {
    this.canNotLoadImage = true;
  }

  @action
  onFocus() {
    this.focused = true;
  }

  @action
  onFocusOut() {
    this.focused = false;
  }

  @action
  onMouseEnter() {
    this.hovered = true;
  }

  @action
  onMouseLeave() {
    this.hovered = false;
  }
}
