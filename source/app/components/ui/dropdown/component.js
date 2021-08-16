import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UiDropdownComponent extends Component {
  @tracked opened = false;

  @action
  onEnter() {
    this.opened = true;
  }

  @action
  onLeave() {
    this.opened = false;
  }
}
