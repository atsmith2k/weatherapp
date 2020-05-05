import { cities } from '/cities.js';


console.log('weather app online');

// import data for cities in Indiana

// notice cities.js has an "export"
// we can now use the variable 'cities' here in P6.js
// always check to make sure it works:
console.log(cities);

// PROJECT 6 (SEE DIRECTIONS IN PROJECT ASSIGNMENT)
// Using this code as a starter, and any styling/code from P5 that is helpful
// Make a weather app that takes a zipcode but ALSO any CITY in Indiana (you'll need two inputs)
// then displays the local weather conditions

// THINGS WE ARE LOOKING FOR YOU TO DO:
// • verify that use has entered a valid city name (or zip)
// • for cities, get the city ID from our cities.js for use in the API call
// • update the user with the local weather conditions (at least what was in P5)
// • make sure the temperature is in F or C and not Kelvin
// • give the app an interface
//    if you aren't good with design, start with our CSS from last time
//    if you are, creating your own interface
// • add two new visual aides / weather information (your choice)
// - for example: (1) update the bkg with what the current weather looks like
// - (2) like the WTF weather app, have it display a fun message depending on the conditions
// - (3) give the user a radio button (or similar) choice for F or C readings
// - (4) make a fancier loading animation / graphic
// - (5) add an icon/img showing the conditions, the name of which is part of the current conditions JSON
//       BECAUSE OF SECURITY REASONS, YOU WOULD NEED TO DOWNLOAD THESE TO USE
//       but if you do that, the name of the image is in <data-response>.weather[0].icon
//       https://openweathermap.org/weather-conditions
//       OR download other images or create your own icons
// - (6) come up with your own addition / adjustment
//please use this key for weather API
const API_KEY = "e18b349af4a79cc43344c92f3ed9e172"

// ONE
// select HTML elements for the form (zipcode & button)
// select HTML elements for the output (error & info)
var zip = document.querySelector(".zipcode");
var btn = document.querySelector("#zipBtn");
var city = document.querySelector(".city");
var cityBtn = document.querySelector("#cityBtn");
const error = document.querySelector(".error");

zip.value = "";

function searchQuery(zipcode) {
    //SOURCE: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-12.php
    var regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  
    if (regexp.test(zipcode))
      {
        getWeather(zipcode);
      }
    else
      {
        error.innerHTML = "Invalid Zip!";
      }
}

var json = "";
var info = document.querySelector(".info");
async function getWeather(zip) {
    const apiReturn = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}`);
    if(apiReturn.ok) {
        error.innerHTML = "";
        json = await apiReturn.json();

        //pulls the data from the json and parses into a readable context
        var html = `<p>Forecast for ${json.name}.</p>
                    <p>Humidity is at ${json.main.humidity}%</p>
                    <p>Temperature is ${Math.round(((json.main.temp-273.15)*1.8)+32)}°F</p>
                    <p>Conditions: ${json.weather[0].description}</p>`;
        info.classList.add("weather-desc");
        info.innerHTML = html;
    } else {
        error.innerHTML = "Something went wrong when fetching data!";
    }
    

}

async function getCityWeather(cityId) {
    const apiReturn = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}`);
    if(apiReturn.ok) {
        error.innerHTML = "";
        json = await apiReturn.json();

        //pulls the data from the json and parses into a readable context
        var html = `<p>Forecast for ${json.name}.</p>
                    <p>Humidity is at ${json.main.humidity}%</p>
                    <p>Temperature is ${Math.round(((json.main.temp-273.15)*1.8)+32)}°F</p>
                    <p>Conditions: ${json.weather[0].description}</p><br>
                    <input type="radio" id="fahr" name="temp" value="°F" checked="true">
                    <label for="fahr">°F</label>
                    <input type="radio" id="cel" name="temp" value="°C">
                    <label for="cel">°C</label>`;
        info.classList.add("weather-desc");
        info.innerHTML = html;
        var fahr = document.querySelector('#fahr');
        var celsius = document.querySelector('#cel');

        fahr.addEventListener("click", e => {
            //celsius.classList.toggle("checked");
            var html = `<p>Forecast for ${json.name}.</p>
                            <p>Humidity is at ${json.main.humidity}%</p>
                            <p>Temperature is ${Math.round(((json.main.temp-273.15)*1.8)+32)}°F</p>
                            <p>Conditions: ${json.weather[0].description}</p>`;
                info.classList.add("weather-desc");
                fahr.insertAdjacentElement("before", html);
        });

        celsius.addEventListener("click", e => {
            //fahr.classList.toggle("checked");
            var html = `<p>Forecast for ${json.name}.</p>
                            <p>Humidity is at ${json.main.humidity}%</p>
                            <p>Temperature is ${Math.round(((json.main.temp-273.15)))}°C </p>
                            <p>Conditions: ${json.weather[0].description}</p>`;
                info.classList.add("weather-desc");
                fahr.insertAdjacentElement("before", html);
        });
    } else {
        error.innerHTML = "Something went wrong when fetching data!";
    }
    

}



function cityValidator(cityName) {
    
    //console.log(thisCity.name);
    if(!cities.some(e => e.name.toLowerCase() === cityName.toLowerCase())) {
        error.innerHTML = "Invalid city name!";
    } else {
        var thisCity = cities.find( e => e.name.toLowerCase() === cityName.toLowerCase());
        getCityWeather(thisCity.id);
    }
}


// TWO
// When 'search' button is clicked:
//    call a function to first validate the zipcode typed in by the user
// in other words:
//    call searchQuery() and pass it zipcode's value

//event listener for when the search button is hit
btn.addEventListener("click", e => {
    console.log(zip.value);
    if(zip.value != "") {
        searchQuery(zip.value);
    }
});

cityBtn.addEventListener("click", e => {
	if(city.value != "") {
		cityValidator(city.value);
	}
});


















