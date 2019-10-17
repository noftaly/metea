import 'dotenv/config';
import express from 'express';
import api from './routes/api';
import forecast from './routes/forecast';

export const apikeys = {
  darksky: process.env.DARKSKY_API,           // https://darksky.net (weather data)
  opencagedata: process.env.OPENCAGEDATA_API, // https://opencagedata.com (localisation/geocoding/reverse geocoding)
};

const app = express();

app.listen(3000, () => console.log('Listening at port 3000!'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static('public/'));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_request, response) => response.render('index'));
app.get('/index', (_request, response) => response.redirect('/'));
app.get('/about', (_request, response) => response.render('about'));
app.get('/legals', (_request, response) => response.render('legals'));
app.get('/forecast', forecast);
app.use('/api', api);
app.use('/api/documentations', (_request, response) => response.render('documentations'));
app.use('/api/docs', (_request, response) => response.redirect('/documentations'));

app.get('/source', (_request, response) => response.redirect('https://github.com/noftaly/metea'));

app.get('*', (_request, response) => response.render('error', { error: 404, message: "Désolé, mais la page que vous essayer de charger est indisponible ou n'existe pas. Essayez de changer l'URL, ou réessayez ultérieurement." }));
