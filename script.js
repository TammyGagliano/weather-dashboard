// Variables 
var ___ = document.getElementById("today-weather");
var ___ = document.getElementById("city-name");
var ___ = document.getElementById("picture");
var ___ = document.getElementById("temperature");
var ___ = document.getElementById("humidity");
var ___ = document.getElementById("wind-speed");
var ___ = document.getElementById("UV-index");
var ___ = document.getElementById("fiveday-header");


var city;

// Assigning a unique API to a variable
var APIKey = "eceb814eda4b8860bda912a28ff8535f";

// Execute a current weather get request from open weather api
function getWeather(cityName) {

}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


// Parse response to display current weather


// Get UV Index

// When UV Index is good, shows green, when okay shows yellow, when bad shows red

// Get 5 day forecast for city
// Parse response to display forecast for next 5 days

// Get history from local storage 

//Clear history button

