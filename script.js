// GLOBAL Variables
var weather = document.getElementById("today-weather");
var searchBox = document.getElementById("search-button");
var enterCity = document.getElementById("enter-city");
var cityName = document.getElementById("city-name");
var temp = document.getElementById("temperature");
var humid = document.getElementById("humidity");
var wind = document.getElementById("wind-speed");
var uvIndex = document.getElementById("UV-index");
var clearHistory = document.getElementById("clear-history");
var forecastFiveDay = document.getElementById("forecast");
var icon = document.getElementById("weather-icon");
var cityName = document.getElementById("city-name");
var currentDate = document.getElementById("currentdate");

// Assigning a unique API to a variable
var APIKey = "eceb814eda4b8860bda912a28ff8535f";
var displayName = "";

// NEED TO USE THIS FOR DATE // var date = moment().format(" MM/DD/YYYY");

function displayCurrentWeather(current) {
  console.log("Display current weather", current);
document.getElementById("city-name").innerHTML =
   +" " + new Date(current.dt * 1000).toLocaleString();

  document.getElementById("temperature").innerHTML =
    "Temperature: " + current.temp + "&#8457;";
  document.getElementById("humidity").innerHTML =
    "Humidity: " + current.humidity + "&#37;";
  document.getElementById("wind-speed").innerHTML =
    "Wind Speed: " + current.wind_speed + "MPH";
  document.getElementById("UV-index").innerHTML = "UV Index: " + current.uvi;
  document
    .getElementById("weather-icon")
    .setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + current.weather[0].icon + "@2x.png"
    );
  //console.log(current.uvi);

// When UV Index is good, shows green, when ok shows yellow, when bad shows red

var uvIndex = document.querySelector('#UV-index')
var currentUvi = current['uvi'];
uvIndex.textContent = currentUvi;

switch (true) {
  case (currentUvi <= 2):
    uvIndex.className = 'badge badge-success';
      break;
  case (currentUvi <= 5):
    uvIndex.className = 'badge badge-warning';
      break;
  case (currentUvi <=7):
    uvIndex.className = 'badge badge-danger';
      break;
  default:
    uvIndex.className = 'badge text-light';
    uvIndex.setAttribute('style', 'background-color: #553C7B');
}
}

// Display 5-day forecast

function fiveDayForecast(daily) {
  for (i = 0; i < 5; i++) {
    
    
    //document.getElementById('day' + i).children[0].innerHTML= daily[i].dt * 1000;
    document.getElementById("day" + i).children[1].innerHTML =
      "<img src='" +
      "http://openweathermap.org/img/wn/" +
      daily[0].weather[0].icon +
      "@2x.png" +
      "'>";
    document.getElementById("day" + i).children[2].innerHTML =
      daily[i].temp.day + " &#8457;";
    document.getElementById("day" + i).children[3].innerHTML =
      daily[i].humidity + " &#37;";

    // console.log(daily[i].temp.day);
  }
}

var buildSearchHistory = function () {
  // get search history from local storage
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (searchHistory == null) {
      // if the search history local variable does not exist then generate the left column with common locations
      searchHistory = [];
      localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
  }
  var groupContainer = $(".list-group");
  groupContainer.html("");
  for (i in searchHistory) {
      // generate a list group item for each city in search history
      var buttonEL = $("<button>")
          .addClass("list-group-item list-group-item-action")
          .attr("id", "enter-city-list")
          .attr("type", "button")
          .text(searchHistory[i]);
      groupContainer.append(buttonEl);
  }
};

// Save history from local storage

var saveCity = function () {
  var searchHistory = document.getElementById("enter-city").value;
  JSON.parse(window.localStorage.getItem(searchHistory));
  localStorage.setItem("searchHistory",JSON.stringify(searchHistory)); //convert to string
};




//EVENT LISTENERS
//set up event listener on the search button when enter a city
searchBox.addEventListener("click", function () {
  
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      enterCity.value +
      "&appid=" +
      APIKey +
      "&units=imperial"
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      //console.log("Data from API", data);
      //console.log('Getting Lat and Lon', data.coord.lat, data.coord.lon);
      displayName = enterCity.value; //store city name

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&exclude=alerts,minutely,hourly&appid=" +
          APIKey +
          "&units=imperial" +
          "&exclude=daily"
      )
        .then(function (oneCallResp) {
          return oneCallResp.json();
        })
        .then(function (oneCallData) {
          console.log("Getting One Call data", oneCallData);
          displayCurrentWeather(oneCallData.current);
          fiveDayForecast(oneCallData.daily); // calling function current and daily forecast
          saveCity();
        });
    })

    .catch(function (error) {
      alert("Something went wrong. Please try again");
    });
});

// Clear History

clearHistory.addEventListener("click", function () {
  localStorage.clear();
});
