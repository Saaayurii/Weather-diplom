export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const appid = searchParams.get("appid")
  const HOURS = 23

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key not found in environment variables" },
      { status: 401 }
    )
  }
  if (!lat || !lon) {
    return Response.json({ message: "Missing parameters" }, { status: 400 })
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
    return Response.json(
      { message: `OpenWeather API error: ${res.status} - ${errorText}` },
      { status: res.status }
    )
  }

  const data = await res.json()

  return Response.json(data)
}
