import { modifier } from 'ember-modifier';

export default modifier(function onParentBlur(container, [callback]) {
  function handleBlur(event) {
    if (
      !(
        container.contains(event.relatedTarget) ||
        event.relatedTarget === container
      )
    ) {
      callback();
    }
  }

  container.addEventListener('focusout', handleBlur);

  return () => {
    container.removeEventListener('focusout', handleBlur);
  };
});
