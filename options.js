function ghost(isDeactivated) {
  options.disabled = isDeactivated;
}

window.addEventListener('load', function() {
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
  options.value = localStorage.frequency;
  if (!options.isActivated.checked) { ghost(true); }

  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  options.onchange = function() {
    localStorage.frequency = options.value;
  };
});
