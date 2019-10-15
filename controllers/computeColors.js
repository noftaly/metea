export default function getColors(weather) {
  const data = {
    today: {},
    hourly: [],
    daily: [],
  };

  data.today.cloudCover = getCloudcoverColor(weather.today.cloudCover);
  data.today.uvindex = getUvindexColor(weather.today.uvIndex);

  for (let i = 0; i < weather.hourly.data.length; i++) {
    data.hourly[i] = { cloudCover: null, uvindex: null };
    data.hourly[i].cloudCover = getCloudcoverColor(weather.hourly.data[i].cloudCover);
    data.hourly[i].uvindex = getUvindexColor(weather.hourly.data[i].uvIndex);
  }

  for (let i = 0; i < weather.daily.data.length; i++) {
    data.daily[i] = { cloudCover: null, uvindex: null };
    data.daily[i].cloudCover = getCloudcoverColor(weather.daily.data[i].cloudCover);
    data.daily[i].uvindex = getUvindexColor(weather.daily.data[i].uvIndex);
  }

  return data;
}

function getCloudcoverColor(value) {
  if (value < 0.3) return '#14B2D0';
  else if (value < 0.5) return '#78AAB2';
  else if (value < 0.8) return '#9AB5B9';
  else return '#979899';
}

function getUvindexColor(value) {
  if (value < 3) return '#2ecc71';
  else if (value < 6) return '#f1c40f';
  else if (value < 8) return '#e67e22';
  else if (value < 11) return '#e74c3c';
  else return "#9b59b6"
}
