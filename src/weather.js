//fetch data from api link, transform to json and return 3 functions

export default async function getWeather() {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timezone=auto")
    let info = await response.json()
    console.log(info)
    return new Promise((resolve, reject) => {
        const currentWeather = parseCurrentWeather(info);
        console.log(currentWeather);
        resolve({
          current: currentWeather,
          //daily: parseDailyWeather(info.daily),
          //hourly: parseHourData(info),
        });
    
      });
    };

  

function parseCurrentWeather({ current_weather, daily }) {
    const {time: time,
         temperature: currentTemp,
          windspeed : windSpeed,
           weathercode: iconCode} = current_weather
    const {
        temperature_2m_max: [highTemp],
        temperature_2m_min: [lowTemp],
        apparent_temperature_max: [flTemp],
        precipitation_sum: [precip]
    } = daily;

    return {
        time, 
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(highTemp),
        lowTemp: Math.round(lowTemp) ,
        flTemp: Math.round(flTemp),
        windSpeed: Math.round(windSpeed) ,
        precip: Math.round(precip),
        iconCode,
    }
}