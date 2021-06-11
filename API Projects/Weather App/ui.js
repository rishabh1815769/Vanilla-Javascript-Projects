const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('#temp');
const desc = document.querySelector('#description');
const sunriseDOM = document.querySelector('#sunrise');
const sunsetDOM = document.querySelector('#sunset');
const humidity = document.querySelector('#humidity');
const feels_like = document.querySelector('#feels-like');
const wind = document.querySelector('#wind');


document.getElementById('w-change-button').addEventListener('click', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=76d61a460680240ea583999e8c3e511e&units=metric`

      // Using fetch to get data
      fetch(base)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        const {temp} = data.main;
        const place = data.name;
        const {description, icon} = data.weather[0];
        const {sunrise, sunset} = data.sys;

        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        const sunriseGMT = new Date(sunrise * 1000);
        const sunsetGMT = new Date(sunset * 1000);
        const {deg} = data.wind;

        var degToCard = function(deg) {
          if (deg>11.25 && deg<=33.75){
            return "NNE";
          }else if (deg>33.75 && deg<=56.25){
            return "ENE";
          }else if (deg>56.25 && deg<=78.75){
            return "E";
          }else if (deg>78.75 && deg<=101.25){
            return "ESE";
          }else if (deg>101.25 && deg<=123.75){
            return "ESE";
          }else if (deg>123.75 && deg<=146.25){
            return "SE";
          }else if (deg>146.25 && deg<=168.75){
            return "SSE";
          }else if (deg>168.75 && deg<=191.25){
            return "S";
          }else if (deg>191.25 && deg<=213.75){
            return "SSW";
          }else if (deg>213.75 && deg<=236.25){
            return "SW";
          }else if (deg>236.25 && deg<=258.75){
            return "WSW";
          }else if (deg>258.75 && deg<=281.25){
            return "W";
          }else if (deg>281.25 && deg<=303.75){
            return "WNW";
          }else if (deg>303.75 && deg<=326.25){
            return "NW";
          }else if (deg>326.25 && deg<=348.75){
            return "NNW";
          }else{
            return "N"; 
          }
        }

        iconImg.src = iconURL;
        loc.textContent = `${place}`;
        desc.textContent = `${description}`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        wind.textContent = `Wind: ${data.wind.speed}m/s ${degToCard()}`;

        feels_like.textContent = `Feels like: ${data.main.feels_like} °C`;
        tempC.textContent = `${temp.toFixed(2)} °C`;
        sunriseDOM.textContent = `Sunrise Time: ${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `Sunset Time: ${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
      });
    });
  }
});
  
  
  
  
  
  
  
