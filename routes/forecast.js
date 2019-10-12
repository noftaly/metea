import cityData from '../controllers/cityData';
import weatherData from '../controllers/weatherData';
import { getImage } from '../controllers/utils';
import setDescription from '../controllers/setDescription';

const router = require('express').Router();

router.get('/forecast', async (request, response) => {
  const city = request.query.city;
  if (!city) return response.status(200).redirect('index'); // OK

  const data = {
    city: null,
    weather: null,
  };
  data.city = await cityData(city);
  if (!data.city) return response.status(400).render('error'); // Bad Request

  data.weather = await weatherData(`${data.city.coords.lat},${data.city.coords.lon}`, Math.round(Date.now() / 1000));
  if (!data.city) return response.status(500).render('error'); // Server Error

  // Assigning the image and creating the description
  data.weather.today.image = getImage(data.weather.today.icon);
  data.weather.today.description = setDescription('today', data.weather.today);
  for (let i = 0; i < data.weather.hourly.data.length; i++) {
    data.weather.hourly.data[i].image = getImage(data.weather.hourly.data[i].icon);
    data.weather.hourly.data[i].description = setDescription('hourly', data.weather.hourly.data[i]);
  }
  for (let i = 0; i < data.weather.daily.data.length; i++) {
    data.weather.daily.data[i].image = getImage(data.weather.daily.data[i].icon);
    data.weather.daily.data[i].description = setDescription('daily', data.weather.daily.data[i]);
  }

  return response.status(200).render('forecast', { data }); // OK
});

export default router;
