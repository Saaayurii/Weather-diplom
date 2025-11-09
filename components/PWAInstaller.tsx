"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration)
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
        })
    }

    // Handle install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  // Request geolocation permission and save location
  const requestGeolocation = async () => {
    if ("geolocation" in navigator) {
      try {
        // Show loading state if notifications are enabled
        if (Notification.permission === "granted") {
          new Notification("Определение местоположения...", {
            body: "Получаем ваши координаты",
            icon: "/icon-192.png",
            silent: true,
          })
        }

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            }
          )
        })

        const { latitude, longitude } = position.coords

        // Save location to localStorage for future use
        localStorage.setItem("lastKnownLocation", JSON.stringify({
          lat: latitude,
          lon: longitude,
          timestamp: Date.now()
        }))

        // Show success notification
        if (Notification.permission === "granted") {
          new Notification("Местоположение определено! 📍", {
            body: `Широта: ${latitude.toFixed(4)}, Долгота: ${longitude.toFixed(4)}`,
            icon: "/icon-192.png",
          })
        }

        // Navigate to weather page with coordinates
        router.push(`/search?lat=${latitude}&lon=${longitude}`)
      } catch (error: any) {
        console.error("Geolocation error:", error)

        let errorMessage = "Не удалось получить вашу геолокацию."
        if (error.code === 1) {
          errorMessage = "Доступ к геолокации заблокирован. Разрешите доступ в настройках браузера."
        } else if (error.code === 2) {
          errorMessage = "Местоположение недоступно. Проверьте подключение к интернету."
        } else if (error.code === 3) {
          errorMessage = "Превышено время ожидания. Попробуйте снова."
        }

        alert(errorMessage)
      }
    } else {
      alert("Геолокация не поддерживается вашим браузером")
    }
  }

  // Request notification permission and schedule daily notifications
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        console.log("Notification permission granted")

        // Show welcome notification
        new Notification("Погода Донбасса", {
          body: "Уведомления о погоде включены! Вы будете получать ежедневный прогноз.",
          icon: "/icon-192.png",
        })

        // Schedule daily notifications at 8 AM
        scheduleDailyNotification()
      } else if (permission === "denied") {
        alert("Вы заблокировали уведомления. Разрешите их в настройках браузера.")
      }
    } else {
      alert("Уведомления не поддерживаются вашим браузером")
    }
  }

  // Schedule daily weather notification
  const scheduleDailyNotification = () => {
    // Check if service worker supports notifications
    if ('serviceWorker' in navigator && 'Notification' in window) {
      // Set interval to check daily at 8 AM
      const now = new Date()
      const tomorrow8AM = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        8,
        0,
        0
      )
      const timeUntil8AM = tomorrow8AM.getTime() - now.getTime()

      setTimeout(() => {
        // Send daily notification
        if (Notification.permission === "granted") {
          new Notification("Доброе утро! ☀️", {
            body: "Проверьте прогноз погоды на сегодня",
            icon: "/icon-192.png",
            badge: "/icon-192.png",
            tag: "daily-weather",
            requireInteraction: false,
          })
        }
        // Reschedule for next day
        setInterval(() => {
          if (Notification.permission === "granted") {
            new Notification("Доброе утро! ☀️", {
              body: "Проверьте прогноз погоды на сегодня",
              icon: "/icon-192.png",
              badge: "/icon-192.png",
              tag: "daily-weather",
              requireInteraction: false,
            })
          }
        }, 24 * 60 * 60 * 1000) // 24 hours
      }, timeUntil8AM)
    }
  }

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt")
        }
        setDeferredPrompt(null)
        setShowInstall(false)
      })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {showInstall && (
        <Button onClick={handleInstallClick} variant="outline" size="icon" title="Установить приложение">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </Button>
      )}
      <Button onClick={requestGeolocation} variant="outline" size="icon" title="Моё местоположение">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Button>
      <Button onClick={requestNotificationPermission} variant="outline" size="icon" title="Включить уведомления">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </Button>
    </div>
  )
}
