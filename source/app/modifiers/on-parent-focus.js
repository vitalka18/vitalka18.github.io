import { modifier } from 'ember-modifier';

export default modifier(function onParentFocus(container, [callback]) {
  function handleFocus(event) {
    if (container.contains(event.target)) {
      callback();
    }
  }

  container.addEventListener('focusin', handleFocus);

  return () => {
    container.removeEventListener('focusin', handleFocus);
  };
});
