const lat = document.querySelector('body').getAttribute('data-city-coords-lat');
const lon = document.querySelector('body').getAttribute('data-city-coords-lon');

const map = L.map('map').setView([lat, lon], 8);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={publicAccessToken}', {
  id: 'mapbox.streets',
  publicAccessToken: 'pk.eyJ1Ijoibm9mdGFseSIsImEiOiJjang3Y3UwbTEwOGV5M3htbnFzeXo1OHZ5In0.FZ64EmSJRI_cLZhtl5yrQw',
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.mapbox.com/about/maps">MapBox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

L.marker([lat, lon]).addTo(map);
map.on('dblclick', event => redirectToWeather(`${event.latlng.lat},${event.latlng.lng}`)); // eslint-disable-line no-undef
