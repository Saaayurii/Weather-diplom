export const getAirPollutionData = async ({
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
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error("OpenWeather Air Pollution API Error:", res.status, errorText)
    throw new Error(`OpenWeather API error: ${res.status}`)
  }

  return res.json()
}
