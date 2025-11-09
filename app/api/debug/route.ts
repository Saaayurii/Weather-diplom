export async function GET() {
  return Response.json({
    hasOpenWeatherKey: !!process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
    hasMapboxToken: !!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    hasGoogleMapsKey: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    // Don't expose actual keys, just first/last chars for verification
    openWeatherKeyPreview: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
      ? `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY.slice(0, 4)}...${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY.slice(-4)}`
      : 'NOT SET',
  })
}
