import express from 'express';

const router = express.Router();

router.get('/api', (_request, response) => {
  response.status(200).render('api/hub');
});

router.get('/api/:version', (request, response) => {
  const version = request.params.version;
  if (version === 'v1') {
    response.status(200).redirect(`/api/${version}/documentation`);
  } else {
    response.status(404).redirect('/api');
  }
});

export default router;
