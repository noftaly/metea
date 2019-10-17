import {
  bearing,
  capitalize,
  moon,
  padNumber,
  predictPrecipitation,
  translatePrecipType,
  visibility,
} from './utils';

const icons = {
  summary: '<i class="fas fa-align-left"></i>',
  rain: '<i class="fas fa-cloud-showers-heavy"></i>',
  drop: '<i class="fas fa-tint"></i>',
  thermometer: '<i class="fas fa-thermometer-half"></i>',
  wind: '<i class="fas fa-wind"></i>',
  sun: '<i class="far fa-sun"></i>',
  moon: '<i class="fas fa-moon"></i>',
  cloud: '<i class="fas fa-cloud"></i>',
  pressure: '<i class="fas fa-globe-africa"></i>',
  visibility: '<i class="fas fa-binoculars"></i>',
};

export default function setDescription(time, w) {
  let text = '';
  const maxTempTime = new Date(w.temperatureMaxTime * 1000);
  const minTempTime = new Date(w.temperatureMinTime * 1000);
  const sunriseTime = new Date(w.sunriseTime * 1000);
  const sunsetTime = new Date(w.sunsetTime * 1000);

  let tense = {};
  if (time === 'today') {
    tense = { be: 'est', have: 'a' };
  } else if (time === 'daily' || time === 'hourly') {
    tense = { be: 'sera', have: 'aura' };
  }

  text += `${icons.summary} ${capitalize(w.summary.toLowerCase())}${w.summary.slice(-1) !== '.' ? '.' : ''}`;
  text += `<br />${icons.visibility} La visibilité ${tense.be} ${visibility(w.visibility * 1000)}.`;
  if (w.precipProbability && w.precipType) {
    text += `<br />${icons.rain} ${predictPrecipitation(translatePrecipType(w.precipType), Math.round(w.precipProbability * 100))}`;
  } else {
    text += `<br />${icons.rain} ${predictPrecipitation('pleuvoir', 0)}.`;
  }

  if (time !== 'hourly') {
    tense.tempMax = w.temperatureMaxTime * 1000 > Date.now() || time === 'daily' ? 'sera' : 'était';
    tense.tempMin = w.temperatureMinTime * 1000 > Date.now() || time === 'daily' ? 'sera' : 'était';
    text += `<br />${icons.thermometer} La temperature maximale ${tense.tempMax} de ${Math.round(w.temperatureMax)}°C, ressentie ${Math.round(w.apparentTemperatureMax)}°C, à ${padNumber(maxTempTime.getHours())}h${padNumber(maxTempTime.getMinutes())}.`;
    text += `<br />${icons.thermometer} La temperature minimale ${tense.tempMin} de ${Math.round(w.temperatureMin)}°C, ressentie ${Math.round(w.apparentTemperatureMin)}°C, à ${padNumber(minTempTime.getHours())}h${padNumber(minTempTime.getMinutes())}.`;
    text += `<br />${icons.wind} Le vent ${tense.have} une vitesse moyenne de ${Math.round(w.windSpeed)}km/h, direction ${bearing(w.windBearing)}, avec des rafales pouvant aller jusqu'à ${Math.round(w.windGust)}km/h.`;
    text += `<br />${icons.sun} Le Soleil se lève à ${padNumber(sunriseTime.getHours())}h${padNumber(sunriseTime.getMinutes())} et se couche à ${padNumber(sunsetTime.getHours())}h${padNumber(sunsetTime.getMinutes())}.`;
    text += `<br />${icons.moon} La lune ${tense.be} une ${moon(w.moonPhase)}.`;
  } else {
    text += `<br />${icons.thermometer} La temperature ${tense.be} de ${Math.round(w.temperature)}°C, ressentie ${Math.round(w.apparentTemperature)}°C.`;
  }

  return text;
}
