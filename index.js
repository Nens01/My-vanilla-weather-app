function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;

  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="weather-app-forecast-day">
          <div class="weather-app-forecast-date">${formatDay(day.time)}</div>
          <img src="${
            day.condition.icon_url
          }" class="weather-app-forecast-icon" />
          <div class="weather-app-forecast-temp">
            <span class="weather-app-forecast-temp-max">${Math.round(
              day.temperature.maximum
            )}°</span>
            <span class="weather-app-forecast-temp-min">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "96t02003264bec3oa3b933aaca0f777f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function searchCity(city) {
  let apiKey = "96t02003264bec3oa3b933aaca0f777f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  if (searchInput.value) {
    searchCity(searchInput.value);
  }
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

// Default city
searchCity("Paris");
