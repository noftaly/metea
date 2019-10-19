import 'dotenv/config';
import express from 'express';
import forecast from './routes/forecast';

import apiBase from './routes/api/base';
import apiDoc from './routes/api/doc';
import apiCity from './routes/api/city';
import apiWeather from './routes/api/weather';

export const apikeys = {
  darksky: process.env.DARKSKY_API,           // https://darksky.net (weather data)
  opencagedata: process.env.OPENCAGEDATA_API, // https://opencagedata.com (localisation/geocoding/reverse geocoding)
};

const app = express();

app.listen(3000, () => console.log('Listening at port 3000!'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public/'));

app.get('/', (_request, response) => response.render('index'));
app.get('/index', (_request, response) => response.redirect('/'));
app.get('/about', (_request, response) => response.render('about'));
app.get('/legals', (_request, response) => response.render('legals'));
app.get('/source', (_request, response) => response.redirect('https://github.com/noftaly/metea'));
app.get('/forecast', forecast);
app.use(apiBase);
app.use(apiDoc);
app.use(apiCity);
app.use(apiWeather);


app.get('*', (_request, response) => response.render('error', { error: 404, message: "Désolé, mais la page que vous essayer de charger est indisponible ou n'existe pas. Essayez de changer l'URL, ou réessayez ultérieurement." }));
