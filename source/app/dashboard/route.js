import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardRoute extends Route {
  @service store;

  async model() {
    return this.store.findAll('asset');
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    controller.sortedModel = controller.sortAndFilterAssets(
      controller.sortBy,
      controller.sortDir
    );
    controller.assets = controller.paginateAssets(controller.page);
  }
}
