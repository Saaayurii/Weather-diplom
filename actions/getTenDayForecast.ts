export const getTenDayForecast = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY

  if (!appid) {
    throw new Error("OpenWeather API key not found")
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error("OpenWeather Forecast API Error:", res.status, errorText)
    throw new Error(`OpenWeather API error: ${res.status}`)
  }

  const forecastData = await res.json()

  // Transform 3-hourly forecast into daily forecast
  const dailyData: Record<string, any> = {}

  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0]

    if (!dailyData[date]) {
      dailyData[date] = {
        dt: item.dt,
        temps: [],
        weather: item.weather,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        wind_speed: item.wind.speed,
        wind_deg: item.wind.deg,
        clouds: item.clouds.all,
        pop: item.pop || 0,
      }
    }

    dailyData[date].temps.push(item.main.temp)
    dailyData[date].pop = Math.max(dailyData[date].pop, item.pop || 0)
  })

  // Convert to array and calculate min/max
  const list = Object.values(dailyData).map((day: any) => ({
    dt: day.dt,
    sunrise: forecastData.city.sunrise,
    sunset: forecastData.city.sunset,
    temp: {
      day: day.temps[Math.floor(day.temps.length / 2)] || day.temps[0],
      min: Math.min(...day.temps),
      max: Math.max(...day.temps),
      night: day.temps[day.temps.length - 1] || day.temps[0],
      eve: day.temps[day.temps.length - 2] || day.temps[0],
      morn: day.temps[0],
    },
    feels_like: {
      day: 0,
      night: 0,
      eve: 0,
      morn: 0,
    },
    pressure: day.pressure,
    humidity: day.humidity,
    weather: day.weather,
    speed: day.wind_speed,
    deg: day.wind_deg,
    gust: 0,
    clouds: day.clouds,
    pop: day.pop,
  }))

  return {
    city: forecastData.city,
    cod: forecastData.cod,
    message: forecastData.message,
    cnt: list.length,
    list: list.slice(0, 10), // Limit to 10 days
  }
}
