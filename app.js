import express from 'express';
import forecast from './routes/forecast';
import 'dotenv/config';

export const apikeys = {
	darksky: process.env.DARKSKY_API,             // darksky.net (weather data)
	opencagedata: process.env.OPENCAGEDATA_API,   // opencagedata.com (localisation/geocoding/reverse geocoding)
	thunderforest: process.env.THUNDERFOREST_API, // thunderforest.com (map tileset)
};

const app = express();

app.listen(3000, () => console.log('Listening at port 3000!'))
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static('public/'));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_request, response) => response.redirect('index'));
app.get('/index', (_request, response) => response.render('index'));
app.get('/about', (_request, response) => response.render('about'));
app.get('/legals', (_request, response) => response.render('legals'));
app.get('/forecast', forecast);
app.get('*', (_request, response) => response.render('error'));

// app.use('/city', city);
// app.use('/api', api);
