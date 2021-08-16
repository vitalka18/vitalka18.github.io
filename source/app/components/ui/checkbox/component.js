import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class UiCheckboxComponent extends Component {
  @tracked checked;
  id = guidFor(this);

  @action
  onChange(event) {
    this.args.changed(event.target.checked);
  }
}
