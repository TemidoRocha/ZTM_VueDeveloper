export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-green-400 text-xl`;

    if (binding.value.right) {
      // the modifiers cannot haver values, they are only boolean values
      iconClass += ' float-right';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  }
};
