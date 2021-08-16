import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { camelize } from '@ember/string';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class DashboardController extends Controller {
  @tracked sortBy = 'used-total-count';
  @tracked sortDir = 'desc';
  @tracked page = 1;
  @tracked perPage = 50;
  @tracked model;
  @tracked filters = A([]);
  @tracked assets = A([]);
  sortedModel = A([]);

  availableSortDir = ['desc', 'asc'];
  queryParams = [
    {
      sortBy: 'sort-by',
    },
    { sortDir: 'sort-dir' },
    'page',
    { perPage: 'per-page' },
  ];
  sortByProperties = [
    {
      property: 'used-total-count',
      title: 'Used total',
    },
    {
      property: 'created-at',
      title: 'Created At',
    },
  ];

  get isSortByValid() {
    return this.sortByProperties.mapBy('property').indexOf(this.sortBy) > -1;
  }

  get isSortDirValid() {
    return this.availableSortDir.indexOf(this.sortDir) > -1;
  }

  sortAndFilterAssets(sortByProp, sortDirProp) {
    const sortBy = this.isSortByValid ? sortByProp : 'usedTotalCount';
    const sortDir = this.isSortDirValid ? sortDirProp : 'desc';

    let sortedModel = this.model.toArray();

    if (sortBy && sortDir) {
      sortedModel = sortedModel.sort((a, b) => {
        if (sortDir === 'asc') {
          return a[camelize(sortBy)] > b[camelize(sortBy)] ? 1 : -1;
        } else {
          return a[camelize(sortBy)] < b[camelize(sortBy)] ? 1 : -1;
        }
      });
    }

    if (this.filters.length !== 0) {
      sortedModel = sortedModel.filter((asset) => {
        return this.filters.any((type) => asset.type === type);
      });
    }

    return sortedModel;
  }

  paginateAssets(pages) {
    if (pages && this.perPage) {
      return this.sortedModel.slice(0, pages * this.perPage);
    }
  }

  @action
  onFilterAssets(filters) {
    this.page = 1;
    this.filters = filters;
    this.sortedModel = this.sortAndFilterAssets(this.sortBy, this.sortDir);
    this.assets = this.paginateAssets(1);
  }

  @action
  onLoadMore(pages) {
    this.assets = this.paginateAssets(pages);
  }

  @action
  onUseAsset(asset) {
    alert(`Asset with id ${asset.id} was selected`);
  }

  @action
  onSortAssets(sortBy, sortDir) {
    this.page = 1;
    this.sortedModel = this.sortAndFilterAssets(sortBy, sortDir);
    this.assets = this.paginateAssets(1);
  }
}
