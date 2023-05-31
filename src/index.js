
import getWeather from "./weather.js"
import {ICON_MAP} from "./iconMap"
import {Message_Map} from "./messageMap"

// activeare geolocatie pentru afisarea vremii locale
navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch(e => {
      console.error(e)
      alert("Eroare obtinere date meteo :(")
    })
}

function positionError() {
  alert(
    "A aparut o eroare! Activeaza locatia si reincarca pagina!"
  )
}


// afisare date vreme initiale si in functie de preferinta (zile/ore)

  function renderWeather({current, daily, hourly}) {
    renderCurrentWeather(current);
    renderDailyWeather(daily);

    const hourlySection = document.querySelector(".hour-section");
    const dailySection = document.querySelector("[data-day-section]")

    const dayTab = document.querySelector(".zile");
        dayTab.addEventListener("click", () => {
             renderDailyWeather(daily);
             hourlySection.style.display = "none";
             dailySection.style.display = "flex"

    })

    const hourTab = document.querySelector(".ore");
        hourTab.addEventListener("click", () => {
            renderHourlyWeather(hourly);
            dailySection.style.display = "none"
            hourlySection.style.display = "table"
    })
    
    
  }

//helper function
    function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
  }


  // transform icon code to svg img
  function getIconUrl(iconCode){
    return `./assets/animated/${ICON_MAP.get(iconCode)}.svg`
}

    function getMessage(iconCode){
        return Message_Map.get(iconCode)
    }


  function renderCurrentWeather(current) {
    const currentIcon = document.querySelector("#main")
    currentIcon.src = getIconUrl(current.iconCode);
    const message = document.querySelector(".message");
    message.textContent = getMessage(current.iconCode);

    setValue("current-temp", current.currentTemp);
    setValue("current-high", current.highTemp);
    setValue("current-min", current.lowTemp);
    setValue("current-feel", current.flTemp);
    setValue("current-wind", current.windSpeed);
    setValue("current-precip", current.precip);
    setValue("current-date", MAIN_day_formatter.format(current.timestamp));
    
  }


const DAY_FORMATTER = new Intl.DateTimeFormat(["ro-RO"], {weekday: "long" });
const MAIN_day_formatter = new Intl.DateTimeFormat(["ro-RO"], 
{weekday: "long",
 day:"numeric", 
 month: "2-digit",
 year: "numeric" });

 const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" })



function renderDailyWeather(daily) {
    const dailySection = document.querySelector("[data-day-section]")
    const dayCardTemplate = document.getElementById("day-card-template")
     dailySection.innerHTML = ""

daily.forEach(day => {
    const element = dayCardTemplate.content.cloneNode(true) // cloning the format of the day template
    setValue("temp", day.maxTemp, { parent: element })
    setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: element })
    element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)

    dailySection.append(element)
  })
}


function renderHourlyWeather(hourly) {
    const hourlySection = document.querySelector("[data-hour-section]");
    const hourRowTemplate = document.getElementById("hour-row-template");
    hourlySection.innerHTML = "";
    
    
    hourly.forEach((hour, index) => {
        if(index <24) {
        index++;
        const element = hourRowTemplate.content.cloneNode(true);
        setValue("temp", hour.temp, { parent: element });
        setValue("fl-temp", hour.feelsLike, { parent: element });
        setValue("wind", hour.windSpeed, { parent: element });
        setValue("precip", hour.precip, { parent: element });
        setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: element });
        setValue("time", HOUR_FORMATTER.format(hour.timestamp), { parent: element });
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode);
        hourlySection.append(element)

        
  }})
}