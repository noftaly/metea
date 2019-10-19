import express from 'express';

const router = express.Router();
const validVersions = ['v1'];

router.get('/api/:version/documentation', (request, response) => {
  const version = request.params.version;
  if (validVersions.includes(version)) {
    response.status(200).render('../views/api/documentation', { version });
  } else {
    response.status(404).redirect('/api');
  }
});

export default router;
