import { fetchWeatherApi } from 'openmeteo';

export default async function	windAPI({}) {
  const params = {
    "latitude": -22.4256,
    "longitude": -45.4528,
    "timezone": "America/Sao_Paulo",
    "hourly": ["wind_speed_10m", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m"],
    "forecast_days": 14
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  
  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  
  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];
  
  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();
  
  const hourly = response.hourly();
  
  // Note: The order of weather variables in the URL query and the indices below need to match
  const weatherData = {
  
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      windSpeed10m: hourly.variables(0).valuesArray(),
      windSpeed80m: hourly.variables(1).valuesArray(),
      windSpeed120m: hourly.variables(2).valuesArray(),
      windSpeed180m: hourly.variables(3).valuesArray(),
    },
  
  };
  
  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  // for (let i = 0; i < weatherData.hourly.time.length; i++) {
  //   console.log(
  //     weatherData.hourly.time[i].toISOString(),
  //     weatherData.hourly.windSpeed10m[i],
  //     weatherData.hourly.windSpeed80m[i],
  //     weatherData.hourly.windSpeed120m[i],
  //     weatherData.hourly.windSpeed180m[i]
  //   );
  // }
  
  return weatherData;
}
	


