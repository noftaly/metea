window.addEventListener('keyup', e => e.keyCode === 13 ? redirectToWeather() : null);

function redirectToWeather() {
  window.location.href = `/forecast?city=${document.getElementById('city-input').value}`;
}
