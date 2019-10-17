import axios from 'axios';
import { apikeys } from '../app';

export default async function weatherData(latlon, date) {
  const p1 = new Promise(async (resolve, reject) => {
    const data = await axios(`https://api.darksky.net/forecast/${apikeys.darksky}/${latlon}?units=si&lang=fr`)
      .then(response => response.data)
      .catch(err => reject(err));
    resolve(data);
  });
  const p2 = new Promise(async (resolve, reject) => {
    const data = await axios(`https://api.darksky.net/forecast/${apikeys.darksky}/${latlon},${date}?units=si&lang=fr`)
      .then(response => response.data.daily.data[0])
      .catch(err => reject(err));
    resolve(data);
  });

  const values = await Promise.all([
    p1.catch(err => err),
    p2.catch(err => err),
  ]).catch(err => void console.error(err));

  const forecast = values[0];
  forecast.today = values[1];

  return forecast || undefined;
}
