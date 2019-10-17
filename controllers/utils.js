export function padNumber(x) {
  return (x.toString().length < 2 ? '0' + x : x).toString();
}

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/gimu, '').replace(/[ ]{2,}/gimu, ' ');
}

export function moon(moonPhase) {
  if (moonPhase === 0) return 'nouvelle Lune';
  else if (moonPhase < 0.25) return 'premier croissant';
  else if (moonPhase === 0.25) return 'premier quartier';
  else if (moonPhase < 0.5) return 'gibbeuse croissante';
  else if (moonPhase === 0.5) return 'pleine Lune';
  else if (moonPhase < 0.75) return 'gibbeuse décroissante';
  else if (moonPhase === 0.75) return 'dernier quartier';
  else if (moonPhase < 1) return 'dernier croissant';
}

export function translatePrecipType(precipType) {
  if (precipType === 'rain') return 'pleuvoir';
  else if (precipType === 'sleet') return 'pleuvoir';
  else if (precipType === 'snow') return 'neiger';
  else if (precipType === 'hail') return 'grêler';
}

export function findDay(day) {
  switch (day) {
    case 0:
    case 7:
      return 'Lundi';
    case 1:
    case 8:
      return 'Mardi';
    case 2:
    case 9:
      return 'Mercredi';
    case 3:
    case 10:
      return 'Jeudi';
    case 4:
    case 11:
      return 'Vendredi';
    case 5:
    case 12:
      return 'Samedi';
    case 6:
    case 13:
      return 'Dimanche';
  }
}

export function visibility(vis) {
  if (vis > 5000) return 'très bonne';
  else if (vis > 1000) return 'bonne';
  else if (vis > 500) return 'moyenne';
  else if (vis > 100) return 'mauvaise';
  return 'très mauvaise';
}

export function predictPrecipitation(type, confidence) {
  const conf = Math.round(confidence / 10) * 10;
  if (conf <= 30) return `Il ne va pas ${type}`;
  else if (conf <= 50) return `Il y a une faible chance qu'il ${type.slice(-2) === 'er' ? type.slice(-1) : 'pleuve'}`;
  else if (conf <= 70) return `Il peut ${type}`;
  return `Il va ${type}`;
}

export function bearing(brng) {
  if (brng >= 348.5 && brng < 11.5) return 'N';
  else if (brng >= 11.5 && brng < 34) return 'NNE';
  else if (brng >= 34 && brng < 56.5) return 'NE';
  else if (brng >= 56.5 && brng < 79) return 'ENE';
  else if (brng >= 79 && brng < 101.5) return 'E';
  else if (brng >= 101.5 && brng < 124) return 'ESE';
  else if (brng >= 124 && brng < 146.5) return 'SE';
  else if (brng >= 146.5 && brng < 169) return 'SSE';
  else if (brng >= 169 && brng < 191.5) return 'S';
  else if (brng >= 191.5 && brng < 214) return 'SSO';
  else if (brng >= 214 && brng < 236.5) return 'SO';
  else if (brng >= 236.5 && brng < 259) return 'OSO';
  else if (brng >= 259 && brng < 281.5) return 'O';
  else if (brng >= 281.5 && brng < 304) return 'ONO';
  else if (brng >= 304 && brng < 326.5) return 'NO';
  else if (brng >= 326.5 && brng < 348.5) return 'NNO';
  return '(direction inconnue)';
}

export function getImage(weatherDesc) {
  switch (weatherDesc) {
    case 'thunderstorm':
      return 'Thunder';
    case 'rain':
      return 'ModRain';
    case 'hail':
      return 'HeavyRain';
    case 'snow':
      return 'ModSnow';
    case 'sleet':
      return 'LightSleet';
    case 'wind':
      return 'Wind';
    case 'fog':
      return 'Fog';
    case 'tornado':
      return 'Tornado';
    case 'clear-day':
      return 'Sunny';
    case 'clear-night':
      return 'Moon';
    case 'partly-cloudy-day':
      return 'PartlyCloudyDay';
    case 'partly-cloudy-night':
      return 'PartlyCloudyNight';
    case 'cloudy':
      return 'Cloudy';
    default:
      return 'Cloudy'; // Cloudy is always a good answer :p
  }
}
