import cityData from '../controllers/cityData';
import weatherData from '../controllers/weatherData';

const router = require('express').Router();

router.get('/city', async (request, response) => {
  if (typeof request.query.q === 'undefined') return response.status(404).json({ status: 404, message: 'No City Specified' });
  const city = request.query.q.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove accents/diacritics

  const info = await cityData(city);
  if (typeof info === 'undefined') return response.status(404).json({ status: 404, message: 'City Not Found' });

  return response.status(200).json(info);
});

router.get('/weather', async (request, response) => {
  if (typeof request.query.lat === 'undefined') return response.status(404).json({ status: 404, message: 'No Latitude Specified' });
  if (typeof request.query.lon === 'undefined') return response.status(404).json({ status: 404, message: 'No Longitude Specified' });

  const info = await weatherData(`${request.query.lat},${request.query.lon}`, Math.round(Date.now() / 1000));
  if (typeof info === 'undefined') return response.status(404).json({ status: 500, message: 'Unable To Retrieve Weather Informations' });

  return response.status(200).json(info);
});

export default router;
