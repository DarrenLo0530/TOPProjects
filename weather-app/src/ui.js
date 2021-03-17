import { format } from 'date-fns';
import capitalize from 'capitalize';
import localTime from './timezone';

import getSevenDayForecast from './weather';
import createTemperatureGraph from './temperature-graph';

function setTime(offset) {
  // Displays the current time
  const currTime = localTime(offset);

  const $time = document.querySelector('.left .time');
  $time.textContent = format(currTime, 'hh:mmaaa');

  const $date = document.querySelector('.left .date');
  $date.textContent = format(currTime, 'EEEE, MMM d');
}

function displayTime(offset) {
  // Updates the time every second
  setInterval(setTime(offset), 1000);
}

function setCurrentLocation(data) {
  // Displays the current location that the data is from
  const $location = document.querySelector('.location');
  $location.textContent = data.city + (data.country ? `, ${data.country}` : '');
}

function setDailyTemperatureGraph(data) {
  const $temperatureGraphContainer = document.querySelector('#daily-temperature-graph');
  $temperatureGraphContainer.textContent = '';
  $temperatureGraphContainer.appendChild(createTemperatureGraph(data, 12));
}

function setCurrentTemperature(data) {
  const $currTemperature = document.querySelector('.left .temperature');
  $currTemperature.textContent = `${data.current.temp}°C`;

  const $currFeelsLike = document.querySelector('.left .feels-like');
  $currFeelsLike.textContent = `Feels like ${data.current.feels_like}°C`;
}

function setCurrentWeatherDesc(data) {
  const $weatherDesc = document.querySelector('.left .weather-desc');
  $weatherDesc.textContent = capitalize(data.current.weather[0].description);
}

function setCurrentWeatherConditions(data) {
  const $windSpeed = document.querySelector('.left .wind-speed');
  $windSpeed.textContent = `${data.current.wind_speed} m/s`;

  const $cloudiness = document.querySelector('.left .cloudiness');
  $cloudiness.textContent = `${data.current.clouds}%`;

  const $humidity = document.querySelector('.left .humidity');
  $humidity.textContent = `${data.current.humidity}%`;
}

function displayTodayData(data) {
  displayTime(data.timezone_offset * 1000);
  setCurrentLocation(data);
  setCurrentTemperature(data);
  setCurrentWeatherDesc(data);
  setCurrentWeatherConditions(data);
  setDailyTemperatureGraph(data);
}

function createDayForecast(date, dayData) {
  const $dayData = document.createElement('template');
  const sunriseTime = (() => {
    const sunriseDate = new Date(parseInt(dayData.sunrise, 10) * 1000);
    return format(sunriseDate, 'h:mm aaa');
  })();
  const sunsetTime = (() => {
    const sunriseDate = new Date(parseInt(dayData.sunset, 10) * 1000);
    return format(sunriseDate, 'h:mm aaa');
  })();

  $dayData.innerHTML = `
    <div class="week-data">
      <div>
          <p class="day-of-week">${format(date, 'EEEE')}</p>
          <p class="day-of-week-extra">${format(date, 'MMM do')}</p>
          <p class="weather-desc">${capitalize(dayData.weather[0].description)}</p>
      </div>
      <div class="temperature tooltip">
          <i title="test" class="fas fa-thermometer-half"></i>
          <span>
              <p class="actual-temp">${dayData.temp.day}°C</p>
              <p class="feels-like-temp">Feels like ${dayData.feels_like.day}°C</p>
          </span>
        
          <span class="tooltip-text">Temperature</span>
      </div>
      <div class="humidity tooltip">
          <i class="fas fa-tint"></i>
          <span class="humidity-info">${dayData.humidity}%</span>
          <span class="tooltip-text">Humidity</span>
      </div>
      <div class="wind-speed tooltip">
          <i class="fas fa-wind"></i>
          <span class="wind-speed-info">${dayData.wind_speed}m/s</span>
          <span class="tooltip-text">Wind speed</span>
      </div>
      <div class="cloudiness tooltip">
          <i class="fas fa-cloud"></i>
          <span class="cloudiness-info">${dayData.clouds}%</span>
          <span class="tooltip-text">Cloudiness</span>
      </div>
      <div class="precipitation tooltip">
          <i class="fas fa-cloud-rain"></i>
          <span class="precipitation-info">${dayData.pop}</span>
          <span class="tooltip-text">Chance of precipitation</span>
      </div>
      <div class="sun-rise tooltip">
          <i class="far fa-sun"></i>
          <span class="sun-rise-info">${sunriseTime}</span>
          <span class="tooltip-text">Sunrise</span>
      </div>                    
      <div class="sun-set tooltip">
          <i class="far fa-moon"></i>
          <span class="sun-set-info">${sunsetTime}</span>
          <span class="tooltip-text">Sunset</span>
      </div>
      <div class="uv tooltip">
          <i class="far fa-lightbulb"></i>                        
          <span class="uv-info">${dayData.uvi}</span>
          <span class="tooltip-text">Ultraviolet index</span>
      </div>
    </div>
  </div>`.trim();

  return $dayData.content.firstChild;
}

function setWeeklyForecast(data) {
  const $weeklyForecast = document.querySelector('.weekly-data');
  $weeklyForecast.textContent = '';
  data.daily.forEach((dayData, index) => {
    const currDate = (() => {
      const date = localTime(data.timezone_offset * 1000);
      date.setDate(date.getDate() + index);
      return date;
    })();

    $weeklyForecast.appendChild(createDayForecast(currDate, dayData));
  });
}

let currentLocation = 'Toronto';

async function displayData(location) {
  const weatherData = await getSevenDayForecast(location);
  displayTodayData(weatherData);
  setWeeklyForecast(weatherData);
  currentLocation = location;
}

function initializeLocationSearch() {
  const $locationForm = document.querySelector('#location-search');
  const $searchBar = document.querySelector('#location-search-bar');

  $searchBar.addEventListener('input', () => {
    $searchBar.setCustomValidity('');
  });

  $locationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = $searchBar.value;

    displayData(location).then(
      () => {
        $searchBar.value = '';
        currentLocation = location;
      },
    ).catch(() => {
      $searchBar.setCustomValidity('Invalid location');
      // Instantly displays the invalid message
      $searchBar.reportValidity();
    });
  });
}

function displayPage() {
  displayData(currentLocation);
  // Update weather data every 30 minutes
  setInterval(displayData(currentLocation), 1000 * 60 * 30);
  initializeLocationSearch();
}

export default displayPage;
