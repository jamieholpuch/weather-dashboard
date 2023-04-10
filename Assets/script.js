var searchButtonEl = document.getElementById('search-bar')
var recentSearchEl = document.getElementById('recent-search')
var forecastCity = document.getElementById('city-forecast')
var fiveDay = document.getElementById('five-day-forecast')

var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=e67be6c9df6cf0b637426949787497f8'

function getWeatherApi(requestUrl) {
   fetch(requestUrl)
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
        })
}



