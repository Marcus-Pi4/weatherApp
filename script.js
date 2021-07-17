

const search = document.getElementById('searchButton');

search.addEventListener('click', searchBarFunction);

function searchBarFunction(event) {
    event.preventDefault();
    let input = document.getElementById('cityUserInput').value;
    console.log(input);
    findCityLatAndLon(input);
};

function findCityLatAndLon(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appId=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`).then(response => response.json()).then(weatherData => {
        displayForecast(weatherData.coord);
        let coordinates = [weatherData.coord.lat, weatherData.coord.lon];
        console.log(coordinates);
    })
};

function displayDate () {
    let date = Date().split(' ');
    var monthDay = [date[0], date[1], date[2]];
    return monthDay
};

function uvIndex(uviNumber) {
    switch (uviNumber) {
        case 0:
            return rgb(0, 255, 0);
        case 1: 
            return rgb(51, 255, 0);
        case 2:
            return rgb(102, 255, 0);;
        case 3:
            return rgb(153, 255, 0);;
        case 4:
            return rgb(204, 255, 0);;
        case 5:
            return rgb(255, 255, 0);
        case 6:
            return rgb(255, 204, 0);
        case 7:
            return rgb(255, 153, 0);
        case 8:
            return rgb(255, 102, 0);
        case 9:
            return rgb(255, 51, 0);
        case 10:
            return rgb(255, 0, 0);
    }
};

function displayForecast(coords){
    const lat = coords.lat;
    const lon = coords.lon;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
        .then(response => response.json())
        .then(weatherData => { 
            document.getElementById('currentUvi').style.backgroundColor = uvIndex
            document.getElementById('day').innerHTML = displayDate()[0];
            document.getElementById('currentDate').innerHTML =  `${displayDate()[1]} ${parseInt(displayDate()[2])}`
            console.log(weatherData.current.weather[0].description);
            document.getElementById('currentWeatherIcon').src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
            document.getElementById('currentWeather').innerHTML = weatherData.current.weather[0].description;
            document.getElementById('currentTemperature').innerHTML = `Temperature: ${weatherData.current.temp} F`;
            document.getElementById('currentWindSpeed').innerHTML = `Wind: ${weatherData.current.wind_speed} mph`;
            document.getElementById('currentHumidity').innerHTML = `Humidity: ${weatherData.current.humidity}%`;
            for (let i = 0; i < 5; i++) {
                console.log(weatherData);
                document.getElementsByClassName('weatherIcon')[i].src = `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`;
                document.getElementsByClassName('weather')[i].innerHTML = weatherData.daily[i].weather[0].description;
                document.getElementsByClassName('date')[i].innerHTML = `${displayDate()[1]}, ${parseInt(displayDate()[2]) + (1 + i) }`;
                document.getElementsByClassName('temperatureMin')[i].innerHTML = `Low: ${weatherData.daily[i].temp.min} F`;
                document.getElementsByClassName('temperatureMax')[i].innerHTML = `High: ${weatherData.daily[i].temp.max} F`;
                document.getElementsByClassName('humidity')[i].innerHTML = `Humidity: ${weatherData.daily[i].humidity}%`;
                document.getElementsByClassName('windSpeed')[i].innerHTML = `Wind: ${weatherData.daily[i].wind_speed} mph`;
            }
            console.log(weatherData);
            let selectDay = document.querySelector('#forecastDay1');
        });
};



// runApp();