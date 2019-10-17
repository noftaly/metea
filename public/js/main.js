function redirectToWeather(pos) {
  if (!pos) pos = document.getElementById('city-input').value;
  window.location.href = `/forecast?city=${pos}`;
}

window.addEventListener('keyup', e => (e.keyCode === 13 ? redirectToWeather() : null));
