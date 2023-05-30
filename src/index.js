import search from "./assets/animated/icons8-search.svg"
import day from "./assets/animated/day.svg"
import cloud1 from "./assets/animated/cloudy-day-1.svg"
import cloud2 from "./assets/animated/cloudy-day-2.svg"
import ncloud1 from "./assets/animated/cloudy-night-1.svg"
import ncloud2 from "./assets/animated/cloudy-night-2.svg"
import night from "./assets/animated/night.svg" 
import rainy1 from "./assets/animated/rainy-1.svg"
import rainy2 from "./assets/animated/rainy-2.svg"
import rainy3 from "./assets/animated/rainy-3.svg"
import thunder from "./assets/animated/thunder.svg"
import snowy1 from "./assets/animated/snowy-1.svg"
import snowy2 from "./assets/animated/snowy-3.svg"
import snowy3 from "./assets/animated/snowy-5.svg"
import backgrounf from "./assets/background.jpg"
import getWeather from "./weather.js"

getWeather().then(rendercurrentWeather)
.catch(error => {
    console.error(error);
  });

  function renderCurrentWeather(current) {
    document.querySelector("[data-current-temp]").textContent = current.currentTemp
  }