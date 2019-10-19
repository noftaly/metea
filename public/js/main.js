function redirectToWeather(pos) {
  if (!pos) pos = document.getElementById('city-input').value;
  window.location.href = `/forecast?city=${pos}`;
}

document.getElementById('city-input').addEventListener('keyup', event => (event.keyCode === 13 ? redirectToWeather() : null));
