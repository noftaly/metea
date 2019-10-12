import axios from 'axios';
import { apikeys } from '../app';

export default async function weatherData(latlon, date) {
	const forecast = await axios(`https://api.darksky.net/forecast/${apikeys.darksky}/${latlon}?units=si&lang=fr`)
    .then(response => response.data)
    .catch(console.error);

  forecast.today = await axios(`https://api.darksky.net/forecast/${apikeys.darksky}/${latlon},${date}?units=si&lang=fr`)
    .then(response => response.data.daily.data[0])
    .catch(console.error);
    
  return forecast || undefined;
}
