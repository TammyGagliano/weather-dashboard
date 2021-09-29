// Parse response to display current weather
// Get UV Index
// When UV Index is good, shows green, when okay shows yellow, when bad shows red
// Get 5 day forecast for city
// Parse response to display forecast for next 5 days
// Get history from local storage 
//Clear history button


// Variables 
var weather = document.getElementById("today-weather");

//var ___ = document.getElementById("picture");
//var ___ = document.getElementById("fiveday-header");


// Assigning a unique API to a variable
var APIKey = "eceb814eda4b8860bda912a28ff8535f";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    axios.get(queryURL)
    

//set up event listener on the search button when we press a key (keypress)
var searchBox = document.getElementById('#search-button');
searchBox.addEventListener('keypress', setQuery);

// The key we are looking to be pressed is #13 which equals to the return key on the keyboard
function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
        console.log('searchBox.value');
    }
}

// After the above function is run, we then run a fetch request where we will get the API queryURL
// Then we will attach the weather and then pass through a query then 
function getResults (query) {
    fetch('${queryURL}weather?q=${query}&units=imperial&appid=${api.key}')
    .then(weather => {          // this will return our weather 
    return weather.json();      // this will convert it to JSON
    }).then(displayResults);    // then we will pass the JSOn through to our displayResults named weather 
}

var city = document.getElementById("city-name");
var temp = document.getElementById("temperature");
var humid = document.getElementById("humidity");
var wind = document.getElementById("wind-speed");
var UV = document.getElementById("UV-index");

function displayResults (weather){
    console.log(weather);
    city.innerText = '${weather.name}';    // get city
    temp.innerHTML = '${Math.round(weather.main.temp)}';
    humid.innerHTML = 
    wind.innerHTML = 
    UV.innerHTML = ''

}



// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

