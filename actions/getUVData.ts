export const getUVData = async ({ lat, lon }: { lat: string; lon: string }) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Open-Meteo API Error:", res.status, errorText)
    throw new Error(`Open-Meteo API error: ${res.status}`)
  }

  return res.json()
}
