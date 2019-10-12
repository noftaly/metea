import axios from 'axios';
import { apikeys } from '../app';

export default async function cityData(city) {
  const data = await axios(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apikeys.opencagedata}&language=fr-FR`)
    .then(response => response.data.results[0])
    .catch(console.error);

  if (!data) return;

  return {
    coords: {
      lat: data.geometry.lat,
      lon: data.geometry.lng
    },
    name: data.components.city || data.components.town || "Nom de ville inconnu",
    formatted: `${data.components.city || data.components.town}${data.components.state ? `, ${data.components.state}` : ""}${data.components.country ? `, ${data.components.country}` : ""}`,
    raw: data,
  };
}
