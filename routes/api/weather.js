import express from 'express';
import weatherData from '../../controllers/weatherData';

const router = express.Router();

router.get('/api/:version/weather', async (request, response) => {
  if (request.params.version === 'v1') {
    if (typeof request.query.lat === 'undefined') return response.status(404).json({ status: 404, message: 'No Latitude Specified' });
    if (typeof request.query.lon === 'undefined') return response.status(404).json({ status: 404, message: 'No Longitude Specified' });

    const info = await weatherData(`${request.query.lat},${request.query.lon}`, Math.round(Date.now() / 1000));
    if (typeof info === 'undefined') return response.status(404).json({ status: 500, message: 'Unable To Retrieve Weather Informations' });

    return response.status(200).json(info);
  }
  return response.status(404).json({ status: 404, message: 'Invalid API Version' });
});

export default router;
