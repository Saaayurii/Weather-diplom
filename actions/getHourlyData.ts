export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const HOURS = 23
  const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY

  if (!appid) {
    throw new Error("OpenWeather API key not found")
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${HOURS}&units=metric&appid=${appid}`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error("OpenWeather API Error:", res.status, errorText)
    throw new Error(`OpenWeather API error: ${res.status}`)
  }

  return res.json()
}
