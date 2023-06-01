//fetch data from api link, transform to json and return 3 functions

export default async function getWeather() {
    try {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=45.65&longitude=25.61&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=auto")
    let info = await response.json()
    console.log(info)
    
    const currentWeather = parseCurrentWeather(info);
    const dailyWeather = parseDailyWeather(info);
    const hourlyWeather = parseHourlyWeather(info);

    return {
      current: currentWeather,
      daily: dailyWeather,
     hourly: hourlyWeather,
    };
  } catch (error) {
    
    console.error(error);
  
  }
}
    

  
//destructuring to get data for real time weather
function parseCurrentWeather({ current_weather, daily }) {
    const {
        timestemp: time,
        temperature: currentTemp,
        windspeed : windSpeed,
        weathercode: iconCode } = current_weather
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

//map over the time array and return 3 coresponding key-valuue pairs (for the same day)
function parseDailyWeather({daily}) {
    return daily.time.map((time,index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
            
        }
    })
}

 //map over time array on hourly to get values for each hour
 function parseHourlyWeather({ hourly, current_weather }) {
    return hourly.time
      .map((time, index) => {
        return {
          timestamp: time * 1000,
          iconCode: hourly.weathercode[index],
          temp: Math.round(hourly.temperature_2m[index]),
          feelsLike: Math.round(hourly.apparent_temperature[index]),
          windSpeed: Math.round(hourly.windspeed_10m[index]),
          precip: Math.round(hourly.precipitation[index] * 100) / 100,
        }
      })
      .filter(({ timestamp }) => timestamp >= current_weather.time * 1000)
  } // filter so that the map iterates from current hour upwards
