"use client"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useMemo, useState } from "react"
import ReactMapGL, { Layer, LayerProps, Source } from "react-map-gl"
import { Card } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LOCATION } from "@/lib/config"
import { useTheme } from "next-themes"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export default function Map() {
  const { theme } = useTheme()
  const MapTheme = useMemo(() => {
    return theme === "system"
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  }, [theme])

  const searchParams = useSearchParams()
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  const [defaultLat, defaultLon] = useMemo(() => {
    const latNumber = lat ? Number(lat) : Number(DEFAULT_LOCATION.coord.lat)
    const lonNumber = lon ? Number(lon) : Number(DEFAULT_LOCATION.coord.lon)
    return [latNumber, lonNumber]
  }, [lat, lon])

  const weatherLayers = useMemo(() => {
    return [
      { label: "Без слоя", code: "none" },
      { label: "Осадки (радар)", code: "radar" },
      { label: "Облака (спутник)", code: "satellite" },
    ]
  }, [])

  const [viewport, setViewport] = useState({
    latitude: lat ? Number(lat) : Number(defaultLat),
    longitude: lon ? Number(lon) : Number(defaultLon),
    zoom: 7,
  })

  const [selectedLayer, setSelectedLayer] = useState("radar")
  const [rainViewerTimestamp, setRainViewerTimestamp] = useState<number | null>(null)

  // Загрузка последнего снимка радара RainViewer
  useEffect(() => {
    fetch("https://api.rainviewer.com/public/weather-maps.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.radar?.past && data.radar.past.length > 0) {
          // Берем последний доступный снимок
          const lastTimestamp = data.radar.past[data.radar.past.length - 1].time
          setRainViewerTimestamp(lastTimestamp)
        }
      })
      .catch((error) => console.error("RainViewer API error:", error))
  }, [])

  useEffect(() => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat ? Number(lat) : Number(defaultLat),
      longitude: lon ? Number(lon) : Number(defaultLon),
    }))
  }, [lat, lon, defaultLat, defaultLon])

  const rainLayer: LayerProps = {
    id: "rainLayer",
    type: "raster",
    paint: {
      "raster-opacity": 0.6,
    },
  }

  const satelliteLayer: LayerProps = {
    id: "satelliteLayer",
    type: "raster",
    paint: {
      "raster-opacity": 0.5,
    },
  }

  return (
    <Card className="order-11 col-span-2 h-[25rem] overflow-hidden overscroll-contain  p-0 md:p-0 xl:col-span-3">
      <div className="absolute right-0 z-10 m-2">
        <Select value={selectedLayer} onValueChange={setSelectedLayer}>
          <SelectTrigger aria-label="Слой карты" className="w-fit">
            <SelectValue placeholder="Слои карты" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {weatherLayers.map((layer) => (
                <SelectItem key={layer.code} value={layer.code}>
                  {layer.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ReactMapGL
        reuseMaps
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        attributionControl={false}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${MapTheme}-v11`}
        style={{
          flex: "1",
          position: "relative",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: 0,
        }}
        dragRotate={true}
        dragPan={true}
        scrollZoom={true}
        touchZoomRotate={true}
        doubleClickZoom={true}
        keyboard={true}
      >
        {selectedLayer === "radar" && rainViewerTimestamp && (
          <Source
            id="rainViewerSource"
            type="raster"
            tiles={[
              `https://tilecache.rainviewer.com/v2/radar/${rainViewerTimestamp}/256/{z}/{x}/{y}/2/1_1.png`,
            ]}
            tileSize={256}
          >
            <Layer {...rainLayer} />
          </Source>
        )}
        {selectedLayer === "satellite" && rainViewerTimestamp && (
          <Source
            id="satelliteSource"
            type="raster"
            tiles={[
              `https://tilecache.rainviewer.com/v2/coverage/${rainViewerTimestamp}/256/{z}/{x}/{y}/0/0_0.png`,
            ]}
            tileSize={256}
          >
            <Layer {...satelliteLayer} />
          </Source>
        )}
      </ReactMapGL>
    </Card>
  )
}
