import { getDate, getConsecutiveDays } from "./utils";
import cloudy from '../img/cloudy.png';
import sunny from '../img/sunny.png';
import snow from '../img/snow.png';
import rain from '../img/rain.png';

let city;
let weatherJson;
let zipcode = document.getElementById('zipcode');
let submit = document.querySelector('button');

submit.addEventListener('click', function(evt){
  if (zipcode.value.length < 5) {
    alert ("Please enter a 5 digit zipcode");
  } else {
    fetch(`https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zipcode.value}`)
      .then(function(geoPromise){
        return geoPromise.json();
      })
      .then(function(geoObj){
          city = geoObj.city;
          fetch(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${geoObj.latitude}&longitude=${geoObj.longitude}&date=${getDate()}`)
            .then(function(weatherPromise){
              return weatherPromise.json();
            }).then(function(weatherObj) {
              weatherJson = weatherObj;
              renderWeather();
            });
      });
  };
});

function renderWeather() {
  renderHeader();
  renderWeatherForecast();
};

function renderHeader() {
  const header = document.createElement('h3');
  header.textContent = `WEATHER FORECAST FOR ${city.toUpperCase()}`;
  header.setAttribute('id', 'header');

  const mainPage = document.getElementById('app');
  mainPage.appendChild(header);
};

function renderWeatherForecast() {
  const threeDays = weatherJson.daily.data.slice(0,3);
  const weatherHeader = document.getElementById('header');
  const forecast = document.createElement('div');
  forecast.setAttribute('class', 'flex');

  threeDays.map((day, index) => {
    let container = document.createElement('div');
    container.setAttribute('class', 'container');
    let headerDay = document.createElement('div');
    headerDay.setAttribute('class', 'dayHeader');
    headerDay.textContent = getDayText(index);

    let weatherContainer = document.createElement('div');
    weatherContainer.setAttribute('class', 'flex');
    let img = document.createElement('img');
    img.src = getImageIcon(day.icon);

    let weatherContentContainer = document.createElement('div');
    let weatherSummary = document.createElement('div');

    let highTemp = document.createElement('span');
    highTemp.setAttribute('class', 'bold');
    let lowTemp = document.createElement('span');
    weatherSummary.textContent = day.summary;
    highTemp.textContent = `${Math.round(day.temperatureHigh)}°`;
    lowTemp.textContent = `/ ${Math.round(day.temperatureLow)}° F`;

    weatherContentContainer.appendChild(weatherSummary);
    weatherContentContainer.appendChild(highTemp);
    weatherContentContainer.appendChild(lowTemp);

    weatherContainer.appendChild(img);
    weatherContainer.appendChild(weatherContentContainer);

    container.appendChild(headerDay);
    container.appendChild(weatherContainer);

    forecast.appendChild(container);
    weatherHeader.appendChild(forecast);
  });
};

function getDayText(number) {
  const consecDays = getConsecutiveDays();

  if (number < 1) {
    return 'Today:';
  };
  return consecDays[number - 1];
};

function getImageIcon(icon) {
  switch(icon) {
    case 'cloudy':
      return cloudy;
      break;
    case 'rain':
      return rain;
      break;
    case 'snow':
      return snow;
      break;
    default:
      return sunny;
  };
};
