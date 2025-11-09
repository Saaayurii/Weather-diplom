export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const appid = searchParams.get("appid")

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key not found in environment variables" },
      { status: 401 }
    )
  }

  if (!lat || !lon) {
    return Response.json({ message: "Missing lat param" }, { status: 400 })
  }

  // Using 5-day forecast endpoint (free tier)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`,
      {
        signal: controller.signal,
        next: { revalidate: 900 },
      }
    )
    clearTimeout(timeoutId)

    if (!res.ok) {
      throw new Error("Failed to fetch data")
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

    const transformedData = {
      city: forecastData.city,
      cod: forecastData.cod,
      message: forecastData.message,
      cnt: list.length,
      list: list.slice(0, 10), // Limit to 10 days
    }

    return Response.json(transformedData)
  } catch (error: any) {
    console.error("OpenWeather API Error:", error)
    if (error.name === 'AbortError') {
      return Response.json(
        { message: "Request timeout - API took too long to respond" },
        { status: 408 }
      )
    }
    return Response.json(
      { message: "Failed to fetch weather data", error: error.message },
      { status: 500 }
    )
  }
}
