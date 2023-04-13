var searchButtonEl = document.getElementById('search-bar')
var recentSearchEl = document.getElementById('recent-search')
var forecastCity = document.getElementById('city-forecast')
var fiveDay = document.getElementById('five-day-forecast')
//grab current day and add 1 day to get five day forecast
var a = dayjs()
var tomorrow = a.add(1, 'day').format('MMM D, YYYY')
var thirdDay = a.add(2, 'day').format('MMM D, YYYY')
var fourthDay = a.add(3, 'day').format('MMM D, YYYY')
var fifthDay = a.add(4, 'day').format('MMM D, YYYY')



function getGeocode(userInput) {
    //convert the city name to lat and lon using geocode fetch
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
    //var requestUrl = url + '&q=' + userInput + API key
    //fetch the weather using the city the user searches for
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
    //fetch the five day forecast using geoCode lat and lon
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
            //set dates
            var todayForecastDate = document.getElementById('today-date');
            var today = dayjs().format('MMM D, YYYY')
            todayForecastDate.textContent = today
            document.getElementById('tomorrow-date').textContent = tomorrow;
            document.getElementById('third-date').textContent = thirdDay;
            document.getElementById('fourth-date').textContent = fourthDay;
            document.getElementById('fifth-date').textContent = fifthDay;
            //set today's weather 
            document.getElementById('today-temp').textContent = "Temperature: " + data.list[0].main.temp + " *F";
            document.getElementById('today-wind').textContent = "Wind: " + data.list[0].wind.speed + " MPH";
            document.getElementById('today-humidity').textContent = "Humidity: " + data.list[0].main.humidity + " %";
            //set tomorrow's weather
            document.getElementById('tomorrow-temp').textContent = "Temperature: " + data.list[8].main.temp + " *F";
            document.getElementById('tomorrow-wind').textContent = "Wind: " + data.list[8].wind.speed + " MPH";
            document.getElementById('tomorrow-humidity').textContent = "Humidity: " + data.list[8].main.humidity + " %";
            //set third day's weather 
            document.getElementById('third-temp').textContent = "Temperature: " + data.list[16].main.temp + " *F";
            document.getElementById('third-wind').textContent = "Wind: " + data.list[16].wind.speed + " MPH";
            document.getElementById('third-humidity').textContent = "Humidity: " + data.list[16].main.humidity + " %";
            //set fourth day's weather
            document.getElementById('fourth-temp').textContent = "Temperature: " + data.list[24].main.temp + " *F";
            document.getElementById('fourth-wind').textContent = "Wind: " + data.list[24].wind.speed + " MPH";
            document.getElementById('fourth-humidity').textContent = "Humidity: " + data.list[24].main.humidity + " %";
            //set fifth day's weather
            document.getElementById('fifth-temp').textContent = "Temperature: " + data.list[32].main.temp + " *F";
            document.getElementById('fifth-wind').textContent = "Wind: " + data.list[32].wind.speed + " MPH";
            document.getElementById('fifth-humidity').textContent = "Humidity: " + data.list[32].main.humidity + " %";
        })
}  

function watchForm() {
    //when user clicks search, prevent default and run each function
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





