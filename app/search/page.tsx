import { getAirPollutionData } from "@/actions/getAirPollutionData"
import { getHourlyData } from "@/actions/getHourlyData"
import { getTenDayForecast } from "@/actions/getTenDayForecast"
import { getUVData } from "@/actions/getUVData"
import CurrentWeather from "@/components/widgets/CurrentWeather"
import HourlyForecast from "@/components/widgets/HourlyForecast"
import Map from "@/components/widgets/Map"
import OtherLargeCities from "@/components/widgets/OtherLargeCities"
import TenDayForecast from "@/components/widgets/TenDayForecast"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import {
  AirPollutionResponse,
  HourlyForecastResponse,
  TenDayForecastData,
  UVIndexResponse,
} from "@/lib/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: searchParamsProps
}): Promise<Metadata> {
  const { lat, lon } = searchParams
  const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
  const HOURS = 23

  if (!appid) {
    return {
      title: "Weather Forecast",
      description: "Weather forecast application",
    }
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${HOURS}&units=metric&appid=${appid}`,
      { next: { revalidate: 900 } }
    )

    if (!res.ok) {
      return {
        title: "Weather Forecast",
        description: "Weather forecast application",
      }
    }

    const data = await res.json()

    return {
      title: `${data.city.name} - Weather Forecast`,
      description: `${data.city.name} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
    }
  } catch (error) {
    return {
      title: "Weather Forecast",
      description: "Weather forecast application",
    }
  }
}

interface searchParamsProps {
  lat: string
  lon: string
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: searchParamsProps
}) {
  const { lat, lon } = searchParams

  const HourlyDataRequest: HourlyForecastResponse = await getHourlyData({
    lat,
    lon,
  })
  const TenDayForecastRequest: TenDayForecastData = await getTenDayForecast({
    lat,
    lon,
  })
  const AirDataRequest: AirPollutionResponse = await getAirPollutionData({
    lat,
    lon,
  })
  const UvIndexRequest: UVIndexResponse = await getUVData({ lat, lon })

  const [hourly_data, ten_day_forecast, air_pollution, uv_index] =
    await Promise.all([
      HourlyDataRequest,
      TenDayForecastRequest,
      AirDataRequest,
      UvIndexRequest,
    ])

  if (!hourly_data || !ten_day_forecast || !air_pollution) return notFound()

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <CurrentWeather data={hourly_data.list[0]} city={hourly_data.city} />
          <TenDayForecast data={ten_day_forecast} />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={hourly_data.list[0]}
            city={hourly_data.city}
            airQuality={air_pollution.list[0]}
            uvIndexForToday={uv_index.daily.uv_index_max[0]}
          />
          <HourlyForecast data={hourly_data.list} />
          <Map />
          <OtherLargeCities />
        </section>
      </div>
    </>
  )
}
