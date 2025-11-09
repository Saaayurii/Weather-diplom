import { getBaseUrl } from "@/lib/utils/getBaseUrl"

export const getTenDayForecast = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const baseUrl = getBaseUrl()
  const data = await fetch(
    `${baseUrl}/api/weather/daily_forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
