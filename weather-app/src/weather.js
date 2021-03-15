const units = 'metric';
const apiKey = '303a35834fef3a3cb0541ebc5021f7e4';

async function getTodaysForecast(location) {
  return (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)).json();
}

async function getSevenDayForecast(location) {
  const todaysData = await getTodaysForecast(location);
  if (todaysData.cod === '404') {
    throw Error('Location could not be found');
  }

  const sevenDayData = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${todaysData.coord.lat}&lon=${todaysData.coord.lon}&units=${units}&appid=${apiKey}`)).json();
  sevenDayData.city = todaysData.name;
  sevenDayData.country = todaysData.sys.country;

  return sevenDayData;
}

export default getSevenDayForecast;
