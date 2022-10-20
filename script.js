

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchBarFunction);
const searchBar = document.getElementById('cityUserInput');
searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchBarFunction(event);
    }
});

//initiates search when search button is clicked;
function searchBarFunction(event) {
    event.preventDefault();

    //uses local storage to store search value
    let input = document.getElementById('cityUserInput').value;
    localStorage.setItem('previousCitySearch', input);

    //Creates a button with the localStorage variable value, which when clicked, will initiate a search with that value, if no repeated buttons are present
    if (document.getElementById(`${localStorage.getItem('previousCitySearch')}`) === null) {
        const createButton = document.createElement('button');
        const getButtonDiv = document.getElementById("previousSearchButtons");
        const localStorageCityName = localStorage.getItem('previousCitySearch');
        getButtonDiv.appendChild(createButton).setAttribute('id',`${localStorageCityName}`);
        document.getElementById(localStorageCityName).classList.add('btn', 'btn-primary', 'mx-2');
        getButtonDiv.appendChild(createButton).innerText = localStorageCityName;
        document.getElementById(localStorageCityName).addEventListener('click', () => {findCityLatAndLon(localStorageCityName)});
    }
    findCityLatAndLon(input);

    //makes hidden elements visible on search
    document.getElementById('currentDay').className = 'container bg-light border border-primary rounded d-block';
    document.getElementById('fiveDayForecast').className = 'container bg-light border border-primary rounded d-block';
};
//fetches the coordinates for a city input to be put into the one call api
function findCityLatAndLon(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appId=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`).then(response => response.json()).then(weatherData => {
        displayForecast(weatherData.coord);
        let coordinates = [weatherData.coord.lat, weatherData.coord.lon];
        console.log(coordinates);
    })
};
//displays date for forecast
function displayDate () {
    let date = Date().split(' ');
    var monthDay = [date[0], date[1], date[2]];
    return monthDay
};
//for this I created 10 rgb points going from green to red to indiciate UVI intensity
function uvIndex(uviNumber) {
    switch (uviNumber) {
        case 0:
            return 'rgb(0, 255, 0)';
        case 1: 
            return 'rgb(51, 255, 0)';
        case 2:
            return 'rgb(102, 255, 0)';
        case 3:
            return 'rgb(153, 255, 0)';
        case 4:
            return 'rgb(204, 255, 0)';
        case 5:
            return 'rgb(255, 255, 0)';
        case 6:
            return 'rgb(255, 204, 0)';
        case 7:
            return 'rgb(255, 153, 0)';
        case 8:
            return 'rgb(255, 102, 0)';
        case 9:
            return 'rgb(255, 51, 0)';
        case 10:
            return 'rgb(255, 0, 0)';
    }
};
//inputs coordinates for one call api, calls it, then appends current day weather, then loops through 5 day forecast.
function displayForecast(coords){
    const lat = coords.lat;
    const lon = coords.lon;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
        .then(response => response.json())
        .then(weatherData => { 
            console.log(weatherData);
            document.getElementById('currentCity').innerHTML = `Current Weather: ${document.getElementById('cityUserInput').value}`;
            document.getElementById('currentUviBackground').style.backgroundColor = uvIndex(parseInt(weatherData.current.uvi));
            document.getElementById('currentUvi').innerHTML = `UVI: ${weatherData.current.uvi}`;
            document.getElementById('day').innerHTML = displayDate()[0];
            document.getElementById('currentDate').innerHTML =  `${displayDate()[1]} ${parseInt(displayDate()[2])}`
            console.log(weatherData.current.weather[0].description);
            document.getElementById('currentWeatherIcon').src = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
            document.getElementById('currentWeather').innerHTML = weatherData.current.weather[0].description;
            document.getElementById('currentTemperature').innerHTML = `Temperature: ${weatherData.current.temp} F`;
            document.getElementById('currentWindSpeed').innerHTML = `Wind: ${weatherData.current.wind_speed} mph`;
            document.getElementById('currentHumidity').innerHTML = `Humidity: ${weatherData.current.humidity}%`;
            for (let i = 0; i < 5; i++) {
                console.log(weatherData);
                document.getElementsByClassName('uvi')[i].style.backgroundColor = uvIndex(parseInt(weatherData.daily[i].uvi));
                document.getElementsByClassName('uvi')[i].innerHTML = `UVI: ${weatherData.daily[i].uvi}`;
                document.getElementsByClassName('weatherIcon')[i].src = `https://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`;
                document.getElementsByClassName('weather')[i].innerHTML = weatherData.daily[i].weather[0].description;
                document.getElementsByClassName('date')[i].innerHTML = `${displayDate()[1]}, ${parseInt(displayDate()[2]) + (1 + i) }`;
                document.getElementsByClassName('temperatureMin')[i].innerHTML = `Low: ${weatherData.daily[i].temp.min} F`;
                document.getElementsByClassName('temperatureMax')[i].innerHTML = `High: ${weatherData.daily[i].temp.max} F`;
                document.getElementsByClassName('humidity')[i].innerHTML = `Humidity: ${weatherData.daily[i].humidity}%`;
                document.getElementsByClassName('windSpeed')[i].innerHTML = `Wind: ${weatherData.daily[i].wind_speed} mph`;
            }
        });
};