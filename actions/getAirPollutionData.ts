import { getBaseUrl } from "@/lib/utils/getBaseUrl"

export const getAirPollutionData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const baseUrl = getBaseUrl()
  const data = await fetch(
    `${baseUrl}/api/weather/air_pollution?lat=${lat}&lon=${lon}`
  )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
