import cityData from '../controllers/cityData';
import weatherData from '../controllers/weatherData';
import chartsData from '../controllers/chartsData';
import { getImage } from '../controllers/utils';
import setDescription from '../controllers/setDescription';

const router = require('express').Router();

router.get('/forecast', async (request, response) => {
  if (!request.query.city) return response.status(200).redirect('index'); // OK
  const city = request.query.city.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove accents/diacritics

  const data = {
    city: null,
    weather: null,
    charts: null,
  };
  data.city = await cityData(city);
  if (!data.city) return response.status(400).render('error', { error: 404, message: "Désolé, mais la page que vous essayer de charger est indisponible ou n'existe pas. Essayez de changer l'URL, ou réessayez ultérieurement." });

  data.weather = await weatherData(`${data.city.coords.lat},${data.city.coords.lon}`, Math.round(Date.now() / 1000));
  if (!data.weather) return response.status(500).render('error', { error: 500, message: "Désolé, mais une erreur interne est survenue dans le serveur. Il a été impossible de récuperer les données de météo." });

  data.charts = chartsData(data.weather);
  if (!data.charts) return response.status(500).render('error', { error: 500, message: "Désolé, mais une erreur interne est survenue dans le serveur. IL a été impossible de récuperer les données des graphiques" });

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
