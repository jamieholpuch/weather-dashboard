var searchButtonEl = document.getElementById('search-bar')
var recentSearchEl = document.getElementById('recent-search')
var forecastCity = document.getElementById('city-forecast')
var fiveDay = document.getElementById('five-day-forecast')


function getGeocode(userInput) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=e67be6c9df6cf0b637426949787497f8`)
    .then(function (response) {
        if (response.status === 200) {
            console.log(response);
            return response.json();
        } else {
            console.log(response.statusText)
        }
    })
    .then(function (data) {
        console.log(data)
        var lat = data[0].lat
        var lon = data[0].lon
        getForecast(lat, lon)
    })
}


function getWeatherApi(userInput) {
    //var requestUrl = url + '&q=' + userInput
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=e67be6c9df6cf0b637426949787497f8`)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response);
                return response.json();
            } else {
                console.log(response.statusText)
            }
        })
        .then(function (data) {
            console.log(data)
            var cityEl = document.getElementById('city-name');
            var tempEl = document.getElementById('city-temp')
            var windEl = document.getElementById('city-wind')
            var humidityEl = document.getElementById('city-humidity')
            var cityDateEl = document.getElementById('city-date')
            var todaysDate = dayjs().format('dddd, MMMM D, YYYY');
            cityDateEl.textContent = todaysDate
            cityEl.textContent = data.name;
            tempEl.textContent = "Temperature: " + data.main.temp + " *F";
            windEl.textContent = "Wind: " + data.wind.speed + " MPH";
            humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
        })
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e67be6c9df6cf0b637426949787497f8`)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response);
                return response.json();
            } else {
                console.log(response.statusText)
            }
        })
        .then(function (data) {
            console.log(data)
            var todayForecastDate = document.getElementById('today-date');
            var todayTempEl = document.getElementById('today-temp');
            var todayWindEl = document.getElementById('today-wind');
            var todayHumidityEl = document.getElementById('today-humidity');
            var today = dayjs().format('MMM D, YYYY')
            todayForecastDate.textContent = today
            todayTempEl.textContent = "Temperature: " + data.list[0].main.temp + " *F";
            todayWindEl.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
            todayHumidityEl.textContent = "Humidity: " + data.list[0].main.humidity + " %";
        })
}  

function watchForm() {
    searchButtonEl.addEventListener("click", function(event) {
        event.preventDefault()
        var userInput = document.getElementById('user-input').value;
        console.log(userInput)
        getWeatherApi(userInput)
        getGeocode(userInput)
        getForecast(lat, lon)
    })
}

watchForm();



