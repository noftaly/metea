import { findDay, padNumber } from './utils';

export default function chartsData(weather) {
  const data = {
    hourly: { id: 'hourly', chart: null },
    daily: { id: 'daily', chart: null },
  };

  data.hourly.chart = processData('hour', weather.hourly);
  data.daily.chart = processData('day', weather.daily);  

  return data;
}

function processData(time, weather) {
  let now, values, loop;
  if (time === 'day') {
    now = new Date(Date.now()).getDay();
    values = { maxTemperatures: [], minTemperatures: [], uvindices: [], pressures: [], ozones: [], clouds: [], humidity: [], wind: [] };
    loop = 8
  } else {
    now = new Date(Date.now()).getHours();
    values = { temperatures: [], uvindices: [], pressures: [], ozones: [], clouds: [], humidity: [], wind: [] };
    loop = 25;
  }
  const labels = [];

	for (let i = 1; i < loop; i++) {
    const w = weather.data[i - 1];

    if (time === 'day') {
      labels.push(findDay(now + i - 1));

      values.maxTemperatures.push(Math.round(w.temperatureMax || 0));
      values.minTemperatures.push(Math.round(w.temperatureMin || 0));
    } else {
      labels.push(`${padNumber((now + i) % 24)}h00`); 

      values.temperatures.push(Math.round(w.temperature || 0));
    }
    
		values.uvindices.push(w.uvIndex || 0);
		values.pressures.push(Math.round(w.pressure || 0));
		values.ozones.push(Math.round(w.ozone || 0));
		values.clouds.push(Math.round(w.cloudCover * 100 || 0));
		values.humidity.push(Math.round(w.humidity * 100 || 0));
		values.wind.push(Number(w.windSpeed.toFixed(1) || 0));
  }

  const datasets = [
    [{
    	label: 'Index UV',
    	data: values.uvindices,
    	backgroundColor: '#feca57',
    	borderColor: '#ff9f43',
    	beginAtZero: true,
    	unit: '',
    	title: 'Index UV (sans unités)'
    }],
    [{
    	label: 'Pression Atmosphérique',
    	data: values.pressures,
    	backgroundColor: '#54a0ff',
    	borderColor: '#2e86de',
    	beginAtZero: false,
    	unit: 'hPa',
    	title: 'Pression atmosphérique en hecto Pascal (hPa)'
    }],
    [{
    	label: 'Ozone',
    	data: values.ozones,
    	backgroundColor: '#1dd1a1',
    	borderColor: '#10ac84',
    	beginAtZero: false,
    	unit: 'DU',
    	title: 'Ozone en unité de Dobson (DU)'
    }],
    [{
    	label: 'Couverture nuageuse',
    	data: values.clouds,
    	backgroundColor: '#c8d6e5',
    	borderColor: '#8395a7',
    	beginAtZero: true,
    	maxY: 100,
    	unit: '%',
    	title: 'Couverture nuageuse en pourcentage (%)'
    }],
    [{
    	label: 'Humidité',
    	data: values.humidity,
    	backgroundColor: '#48dbfb',
    	borderColor: '#0abde3',
    	beginAtZero: true,
    	maxY: 100,
    	unit: '%',
    	title: 'Humidité en pourcentage (%)'
    }],
    [{
    	label: 'Vitesse moyenne du vent',
    	data: values.wind,
    	backgroundColor: '#576574',
    	borderColor: '#222f3e',
    	beginAtZero: true,
    	unit: 'km/h',
    	title: 'Vitesse moyenne du vent en kilomètre par heure (km/h)'
    }],
  ];

  if (time === 'day') {
    datasets.unshift([{
    	label: 'Temperatures maximales',
    	data: values.maxTemperatures,
    	backgroundColor: '#ff6b6b',
    	borderColor: '#ee5253',
    	beginAtZero: true,
    	unit: '°C',
    	title: 'Temperatures en dégrés Celsius (°C)'
    }, {
    	label: 'Temperatures minimales',
    	data: values.minTemperatures,
    	backgroundColor: '#48dbfb',
    	borderColor: '#0abde3',
    	beginAtZero: true,
    	unit: '°C',
    	title: 'Temperatures en dégrés Celsius (°C)'
    }]);
  } else {
    datasets.unshift([{
    	label: 'Temperatures',
    	data: values.temperatures,
    	backgroundColor: '#ff6b6b',
    	borderColor: '#ee5253',
    	beginAtZero: true,
    	unit: '°C',
    	title: 'Temperatures en dégrés Celsius (°C)'
    }]);
  }

  return { datasets, labels };
}
