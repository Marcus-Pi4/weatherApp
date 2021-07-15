

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${45.5051}&lon=${122.6750}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
    .then(response => response.json())
    .then(weatherData => {    
        for (let i = 0; i < 5; i++) {
            document.getElementsByClassName('date')[i].innerHTML = `${displayDate()[0]}, ${parseInt(displayDate()[1]) + i }`;
            document.getElementsByClassName('temperatureMin')[i].innerHTML = weatherData.daily[i].temp.min;
            document.getElementsByClassName('temperatureMax')[i].innerHTML = weatherData.daily[i].temp.max;
            document.getElementsByClassName('windSpeed')[i].innerHTML = weatherData.daily[i];
            document.getElementsByClassName('humidity')[i].innerHTML = `${weatherData.daily[i].humidity}%`;
            document.getElementsByClassName('windSpeed')[i].innerHTML = weatherData.daily[i].wind_speed;
        }
        console.log(weatherData);
        let selectDay = document.querySelector('#forecastDay1');
        document.querySelector('.day').innerHTML = "";
    })
function displayDate () {
    var date = Date().split(' ');
    var monthDay = [date[1], date[2]];
    return monthDay
};

function displayWeatherInfo(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appId=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`).then(response => response.json()).then(weatherData => {
        displayCurrentWeather(weatherData);
        displayForecast(weatherData.coord);
        let coordinates = [weatherData.coord.lat, weatherData.coord.lon];
        console.log(coordinates);
    })
}

function displayForecast(coords){
    //const {lat, lon} = coords;
    const lat = coords.lat;
    const lon = coords.lon;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`).then(response => response.json()).then(weatherData => {
       console.log(weatherData);
    })
}

// runApp();