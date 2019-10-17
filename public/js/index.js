let geolocate = false;
if ('geolocation' in navigator) {
  geolocate = navigator.geolocation.getCurrentPosition(async (pos) => {
    const p1 = new Promise((resolve, _reject) => {
      const data = fetch(`/api/city?q=${pos.coords.latitude},${pos.coords.longitude}`)
        .then(async response => await response.json());
      resolve(data);
    });
    const p2 = new Promise((resolve, _reject) => {
      const data = fetch(`/api/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
        .then(async response => await response.json());
      resolve(data);
    });

    const values = await Promise.all([
      p1.catch(error => error),
      p2.catch(error => error),
    ]);

    document.getElementById('geolocation').innerHTML = `
      <div class="row mt-5">
        <div class="col-auto">
          <div class="card text-white bg-dark mb-3 text-center" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${values[0].name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${values[0].formatted}</h6>
              <hr style="border-color: #666666;">
              <p class="card-text">Météo à ${values[0].name} :<br />${values[1].today.summary}</p>
              <button type="button" class="btn btn-sm btn-block btn-light stretched-link"
                onclick="redirectToWeather('${pos.coords.latitude + ',' + pos.coords.longitude}')">Voir plus...</button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (!values) return false;
    return true;
  });
} else if (!geolocate) {
  console.warn('Geolocation not available or not usable');
}
