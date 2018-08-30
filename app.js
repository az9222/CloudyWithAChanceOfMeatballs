$(document).ready(function(){
    function displayData(data) {
        let cityName = data.name ? data.name : "N/A";
        let weatherMain =  data.weather[0].main && data.weather.length > 0 ? data.weather[0].main: "N/A";
        let weatherDescription = data.weather[0].description && data.weather.length > 0 ? data.weather[0].description : "N/A";
        let humidity = data.main && data.main.humidity ? data.main.humidity : "N/A";
        let tempMin = data.main.temp_min ? data.main.temp_min : "N/A";
        let tempMax = data.main.temp_max ? data.main.temp_max : "N/A";
        let icon = data.weather[0].icon && data.weather.length > 0 ? data.weather[0].icon : "";
        $("#city-name").text(cityName);
        $("#weatherMain").text(weatherMain);
        $("#weatherDescription").text(weatherDescription);
        $("#weatherHumidity").text(humidity+"%");
        $("#tempMin").text((tempMin - 273.15).toFixed(2)+"°C");
        $("#tempMax").text((tempMax - 273.15).toFixed(2)+"°C");
        $("#pic").attr('src', "http://openweathermap.org/img/w/" + icon + ".png");
    }

    function convertToJSON(data) {
        let dataJson = data.json();
        return dataJson;
    }

    function getWeatherData (cityCode) {
        let siteURL = "https://api.openweathermap.org/data/2.5/weather?id="+cityCode+"&APPID=f9f24abb47cc21b35ae1823e50de39bf";
        let weatherData = fetch(siteURL);
        weatherData.then(convertToJSON).then(displayData)
    }

    $(".btn").click(function(event){
        $(".weatherInfo").removeAttr("style");
        $(".btn").removeClass('btn-secondary').addClass('btn-primary')
        $(this).removeClass('btn-primary').addClass('btn-secondary');
        var cityId = event.target.value
        getWeatherData(cityId)
    })
})