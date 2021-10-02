// GLOBAL Variables
var weather = document.getElementById("today-weather");
var searchBox = document.getElementById("search-button");
var enterCity = document.getElementById("enter-city");
var cityName = document.getElementById("city-name");
var temp = document.getElementById("temperature");
var humid = document.getElementById("humidity");
var wind = document.getElementById("wind-speed");
var UV = document.getElementById("UV-index");

//var ___ = document.getElementById("picture");
//var ___ = document.getElementById("fiveday-header");

// Assigning a unique API to a variable
var APIKey = "eceb814eda4b8860bda912a28ff8535f";
var displayName = "";


//HELPER FUNCTIONS 

// display search results in container 

function displayCurrentWeather (current) {
    console.log('Display current weather', current);
    // temp, humidity, windspeed, UV
    cityName.innerText = 'displayName' + ' ' + new Date(current.dt*1000);
    
}
  
// Display forecast 


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
          "&units=imperial"
      ).then(function (oneCallResp) {
        return oneCallResp.json();
      })
      .then(function(oneCallData) {
          console.log('Getting One Call data', oneCallData);
          displayCurrentWeather(oneCallData.current);  // calling function 
      })
    })

    .catch(function (error) {
      alert("Something went wrong. Please try again");
    });
});


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Get UV Index
// When UV Index is good, shows green, when okay shows yellow, when bad shows red
// Get 5 day forecast for city
// Parse response to display forecast for next 5 days
// Get history from local storage
//Clear history button
