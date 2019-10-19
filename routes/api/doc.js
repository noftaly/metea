import express from 'express';

const router = express.Router();

router.get('/api/:version/documentation', (request, response) => {
  const version = request.params.version;
  if (version === 'v1') {
    response.status(200).render('../views/api/documentation', { version: 'v1' });
  } else {
    response.status(404).redirect('/api');
  }
});

export default router;
