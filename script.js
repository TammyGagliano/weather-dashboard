// GLOBAL Variables
var weather = document.getElementById("today-weather");
var searchBox = document.getElementById("search-button");
var enterCity = document.getElementById("enter-city");
var cityName = document.getElementById("city-name");
var temp = document.getElementById("temperature");
var humid = document.getElementById("humidity");
var wind = document.getElementById("wind-speed");
var UV = document.getElementById("UV-index");
var clearHistory = document.getElementById('clear-history');
var forecastFiveDay = document.getElementById('forecast');
var icon = document.getElementById("weather-icon");
//var ___ = document.getElementById("fiveday-header");


// Assigning a unique API to a variable
var APIKey = "eceb814eda4b8860bda912a28ff8535f";
var displayName = "";

// NEED TO USE THIS FOR DATE // var date = moment().format(" MM/DD/YYYY");

function displayCurrentWeather (current) {
    console.log('Display current weather', current);
  //new Date(current.dt*1000);
    cityName.innerText = 'displayName' + ' ' + moment().format(" MM/DD/YYYY");  //IMPORT Moment Library
    document.getElementById('temperature').innerHTML = "Temperature: " + current.temp + 'F';
    document.getElementById('humidity').innerHTML = "Humidity: " + current.humidity + '%';
    document.getElementById('wind-speed').innerHTML = "Wind Speed: " + current.wind_speed + 'MPH';
    document.getElementById('UV-index').innerHTML = "UV Index: " + current.uvi;
    document.getElementById("weather-icon").setAttribute('src', "http://openweathermap.org/img/wn/"+ current.weather[0].icon + "@2x.png");
    
    //console.log(current.uvi);
    
};

// Get UV Index 



//var forecastDate = moment().format(" MM/DD/YYYY");
// Display 5-day forecast 

function fiveDayForecast (daily) {
  
  for (i=0; i < 5; i++) {
    document.getElementById('day' + i).children[2].innerHTML= daily[i].temp.day;
    console.log(daily[i].temp.day);
    
    
  }
}

// Save history from local storage 

var saveCity = function(cityName) {
  

  localStorage.setItem("Grabbing city name and storing", JSON.stringify(cityName));
}



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
      ).then(function (oneCallResp) {
        return oneCallResp.json();
      })
      .then(function(oneCallData) {
          console.log('Getting One Call data', oneCallData);
          displayCurrentWeather(oneCallData.current); 
          fiveDayForecast(oneCallData.daily); // calling function current and daily forecast
      })
    })

    .catch(function (error) {
      alert("Something went wrong. Please try again");
    });
});

// Clear History

 clearHistory.addEventListener("click", function () {
  localStorage.clear();
  
})




// Get UV Index
// When UV Index is good, shows green, when okay shows yellow, when bad shows red
// Get 5 day forecast for city
// Parse response to display forecast for next 5 days
// Get history from local storage
//Clear history button


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city