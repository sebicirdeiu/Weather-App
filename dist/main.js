(()=>{"use strict";function e({daily:e}){return e.time.map(((t,r)=>({timestamp:1e3*t,iconCode:e.weathercode[r],maxTemp:Math.round(e.temperature_2m_max[r])})))}function t({hourly:e,current_weather:t}){return e.time.map(((t,r)=>({timestamp:1e3*t,iconCode:e.weathercode[r],temp:Math.round(e.temperature_2m[r]),feelsLike:Math.round(e.apparent_temperature[r]),windSpeed:Math.round(e.windspeed_10m[r]),precip:Math.round(100*e.precipitation[r])/100}))).filter((({timestamp:e})=>e>=1e3*t.time))}const r=new Map;function n(e,t){e.forEach((e=>{r.set(e,t)}))}n([0,1],"day"),n([2],"cloudy-day-1"),n([3],"cloudy-day-2"),n([45,48],"cloudy-day-3"),n([51,53],"rainy-1"),n([55,56,57],"rainy-2"),n([61,63],"rainy-3"),n([65],"rainy-4"),n([66,67],"rainy-6"),n([71,73,75,77,85,86],"snowy-3"),n([95,96,99],"thunder");const a=new Map;function o(e,t){e.forEach((e=>{a.set(e,t)}))}function i({current:e,daily:t,hourly:r}){!function(e){var t;document.querySelector("#main").src=u(e.iconCode),document.querySelector(".message").textContent=(t=e.iconCode,a.get(t)),c("current-temp",e.currentTemp),c("current-high",e.highTemp),c("current-min",e.lowTemp),c("current-feel",e.flTemp),c("current-wind",e.windSpeed),c("current-precip",e.precip),c("current-date",d.format(e.timestamp))}(e),l(t);const n=document.querySelector(".hour-section"),o=document.querySelector("[data-day-section]");document.querySelector(".zile").addEventListener("click",(()=>{l(t),n.style.display="none",o.style.display="flex"})),document.querySelector(".ore").addEventListener("click",(()=>{!function(e){const t=document.querySelector("[data-hour-section]"),r=document.getElementById("hour-row-template");t.innerHTML="",e.forEach(((e,n)=>{if(n<24){n++;const a=r.content.cloneNode(!0);c("temp",e.temp,{parent:a}),c("fl-temp",e.feelsLike,{parent:a}),c("wind",e.windSpeed,{parent:a}),c("precip",e.precip,{parent:a}),c("day",m.format(e.timestamp),{parent:a}),c("time",p.format(e.timestamp),{parent:a}),a.querySelector("[data-icon]").src=u(e.iconCode),t.append(a)}}))}(r),o.style.display="none",n.style.display="table"}))}function c(e,t,{parent:r=document}={}){r.querySelector(`[data-${e}]`).textContent=t}function u(e){return`./assets/animated/${r.get(e)}.svg`}o([0,1],"Perfect de o limonadă în centru!"),o([2],"Mult soare, câte un nor rătăcit pe alocuri..."),o([3],"Soare cu nori, măcar nu plouă :)"),o([45,48],"Înnorat că la englezi..."),o([51,53],"Câțiva stropi de ploaie,  nu e bai :)"),o([55,56,57],"Ia și umbrela cu tine..."),o([61,63],"Nu uita umbrela!"),o([65],"Ploaie abundentă, ia un taxi!"),o([66,67],"Furtună, nu ieși din casă!"),o([71,73,75,77,85,86],"Hai afară la zăpadă! :)"),o([95,96,99],"Tunete, fulgere și povești de groază..."),navigator.geolocation.getCurrentPosition((function({coords:r}){(async function(){try{const r=await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=auto");let n=await r.json();console.log(n);return{current:function({current_weather:e,daily:t}){const{timestemp:r,temperature:n,windspeed:a,weathercode:o}=e,{temperature_2m_max:[i],temperature_2m_min:[c],apparent_temperature_max:[u],precipitation_sum:[m]}=t;return{time:r,currentTemp:Math.round(n),highTemp:Math.round(i),lowTemp:Math.round(c),flTemp:Math.round(u),windSpeed:Math.round(a),precip:Math.round(m),iconCode:o}}(n),daily:e(n),hourly:t(n)}}catch(e){console.error(e)}})(r.latitude,r.longitude,Intl.DateTimeFormat().resolvedOptions().timeZone).then(i).catch((e=>{console.error(e),alert("Eroare obtinere date meteo :(")}))}),(function(){alert("A aparut o eroare! Activeaza locatia si reincarca pagina!")}));const m=new Intl.DateTimeFormat(["ro-RO"],{weekday:"long"}),d=new Intl.DateTimeFormat(["ro-RO"],{weekday:"long",day:"numeric",month:"2-digit",year:"numeric"}),p=new Intl.DateTimeFormat(void 0,{hour:"numeric"});function l(e){const t=document.querySelector("[data-day-section]"),r=document.getElementById("day-card-template");t.innerHTML="",e.forEach((e=>{const n=r.content.cloneNode(!0);c("temp",e.maxTemp,{parent:n}),c("date",m.format(e.timestamp),{parent:n}),n.querySelector("[data-icon]").src=u(e.iconCode),t.append(n)}))}})();