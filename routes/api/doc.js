import express from 'express';

const router = express.Router();
const validVersions = ['v1'];

router.get('/api/:version/documentation', (request, response) => {
  const version = request.params.version;
  if (validVersions.includes(version)) {
    const elements = {
      city: {
        identifier: 'city',
        data: {
          requestType: 'GET',
          title: 'Récupérer des informations sur une ville',
          description: "Permet de récupérer diverses informations sur une ville, telles que ses coordonées GPS, son nom, son nom formatté... Ces données proviennent de l'API <a href='https://opencagedata.com' target='_blank'>opencagedata.com</a>.",
          urls: {
            full: 'http://localhost:3000/api/v1/city?q=QUERY',
            examples: [
              'http://localhost:3000/api/v1/city?q=paris',
              'http://localhost:3000/api/v1/city?q=new+york',
              'http://localhost:3000/api/v1/city?q=48.8566969,2.3514616',
            ],
          },
          params: [{
            name: 'q',
            desc: 'Ville recherchée, ou coordonnées géographiques de la ville. Si la ville contient des espaces, il faut les remplacer par <code>%20</code> ou <code>+</code>. Les coordonées géographiques doivent se présenter de cette manière&nbsp;: <code>LATITUDE,LONGITUDE</code>.',
          }],
          result: '{\n  "coords": {\n    "lat": 48.8566969,\n    "lon": 2.3514616\n  },\n  "name": "Paris",\n  "formatted": "Paris, Île-de-France, France",\n  "raw": {\n    "Full OpenCageData result"\n  }\n}',
        },
      },
      forecast: {
        identifier: 'forecast',
        data: {
          requestType: 'GET',
          title: "Récupérer la météo d'une location",
          description: "Permet de récupérer diverses informations météorologiques d'une location. Ces données proviennent de l'API <a href='https://darksky.net' target='_blank'>darksky.net</a>.",
          urls: {
            full: 'http://localhost:3000/api/v1/weather?lat=LATITUDE&lon=LONGITUDE',
            examples: [
              'http://localhost:3000/api/v1/weather?lat=48.8566969&lon=2.3514616',
            ],
          },
          params: [{
            name: 'lat',
            desc: 'Latitude de la location recherchée.',
          }, {
            name: 'lon',
            desc: 'Longitude de la location recherchée.',
          }],
          result: "{\n  \"latitude\": 48.8566969,\n  \"longitude\": 2.3514616,\n  \"timezone\": \"Europe/Paris\",\n  \"offset\": 2,\n  \"currently\": {\n    \"Darksky 'currently' result\"\n  },\n  \"hourly\": {\n    \"Darksky 'hourly' result\"\n  },\n  \"daily\": {\n    \"Darksky 'daily' result\"\n  },\n  \"flags\": {\n    \"Darksky 'flags' result\"\n  },\n  \"today\": {\n    \"Darksky 'daily' result, but with only the first day\"\n  }\n}",
        },
      },
    };

    response.status(200).render('../views/api/documentation', { version, names: ['city', 'forecast'], elements });
  } else {
    response.status(404).redirect('/api');
  }
});

export default router;
