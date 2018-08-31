$(document).ready(function(){
    function displayData(data) {
        let cityName = data.name ? data.name : "";
        let weatherMain =  data.weather && data.weather[0].main && data.weather.length > 0 ? data.weather[0].main: "";
        let weatherDescription = data.weather && data.weather[0].description && data.weather.length > 0 ? data.weather[0].description : "";
        let humidity = data.main && data.main.humidity ? data.main.humidity : "";
        let tempMin = data.main && data.main.temp_min ? data.main.temp_min : "";
        let tempMax = data.main && data.main.temp_max ? data.main.temp_max : "";
        let icon = data.weather && data.weather[0].icon && data.weather.length > 0 ? data.weather[0].icon : "";
        let cityCode = data.id ? data.id : "";
        let currentTemperature = data.main && data.main.temp ? data.main.temp : "";

        $("#city-name").text(cityName);
        $("#weatherMain").text(weatherMain);
        $("#weatherDescription").text(weatherDescription);
        $("#weatherHumidity").text(humidity+"%");
        $("#temp").text(((currentTemperature * 9/5) - 459.67).toFixed(2)+"°F");
        $("#tempMin").text(((tempMin * 9/5) - 459.67).toFixed(2)+"°F");
        $("#tempMax").text(((tempMax * 9/5) - 459.67).toFixed(2)+"°F");
        $("#pic").attr('src', "http://openweathermap.org/img/w/" + icon + ".png");
        let img = $('#city-picture');
        img.attr('src', pictureMapping[cityCode]);
    }

    let pictureMapping = {
        4459467: "https://www.foundationrepairservices.com/assets/images/content/1804/page_image.jpg", //id of nc"
        5391959: "http://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/SanFrancisco_0.jpg", //SF
        5128638: "https://blogmedia.evbstatic.com/wp-content/uploads/rally/2017/12/18072307/twenty20_70fc02a0-c467-4ad1-9f08-793bbb9316bb-1500x750.jpg", //NY
        4140963: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFk8v87S2YMk0wIW9x70M8boXw3e5ofDgrE1douIpzn6ZrFI1m",//DC
        4887398: 'http://cdn.mntm.me/07/a2/70/Chicago-Illinois-07a270874f284e8e9791a826954c11bf_c.jpg' //Chicago
    }

    function convertToJSON(data) {
        let dataJson = data.json();
        return dataJson;
    }

    function getWeatherData (cityCode) {
        let siteURL = "https://api.openweathermap.org/data/2.5/weather?id="+cityCode+"&APPID=f9f24abb47cc21b35ae1823e50de39bf";
        let weatherData = fetch(siteURL);
        weatherData.then(convertToJSON).then(displayData);
    }

    $(".btn").click(function(event){
        $(".weatherInfo").removeAttr("style");
        $(".btn").removeClass('btn-secondary').addClass('btn-primary');
        $(this).removeClass('btn-primary').addClass('btn-secondary');
        var cityId = event.target.value;
        getWeatherData(cityId);
    })

    displayData({});

})

