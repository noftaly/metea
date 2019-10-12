import axios from 'axios';
import { apikeys } from '../app';

export default async function cityData(city) {
  const data = await axios(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apikeys.opencagedata}&language=fr-FR`)
    .then(response => response.data.results[0])
    .catch(console.error);

  if (!data) return;

  const formatted = [];
  if (data.components.city || data.components.town) formatted.push(data.components.city || data.components.town);
  if (data.components.state) formatted.push(data.components.state);
  if (data.components.country) formatted.push(data.components.country);
  if (formatted.length === 0) formatted.push("Ville inconnue");

  return {
    coords: {
      lat: data.geometry.lat,
      lon: data.geometry.lng
    },
    name: data.components.city || data.components.town || data.components.state || "Nom de ville inconnu",
    formatted: formatted.join(', '),
    raw: data,
  };
}
