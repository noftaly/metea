import express from 'express';
import cityData from '../../controllers/cityData';

const router = express.Router();

router.get('/api/:version/city', async (request, response) => {
  if (request.params.version === 'v1') {
    if (typeof request.query.q === 'undefined') return response.status(404).json({ status: 404, message: 'No City Specified' });
    const city = request.query.q.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove accents/diacritics

    const info = await cityData(city);
    if (typeof info === 'undefined') return response.status(404).json({ status: 404, message: 'City Not Found' });

    return response.status(200).json(info);
  }
  return response.status(404).json({ status: 404, message: 'Invalid API Version' });
});

export default router;
