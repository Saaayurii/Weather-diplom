# Настройка для деплоя на Vercel

## Шаг 1: Импорт проекта в Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "Add New" → "Project"
3. Импортируйте репозиторий `https://github.com/Saaayurii/Weather-diplom.git`

## Шаг 2: Настройка переменных окружения ⚠️ КРИТИЧНО

**ВАЖНО:** Без этих переменных приложение не будет работать!

### Как добавить переменные на Vercel:

1. Откройте ваш проект на [vercel.com](https://vercel.com)
2. Перейдите в **Settings** (настройки проекта)
3. Найдите раздел **Environment Variables**
4. Добавьте каждую переменную по отдельности:

### Обязательные переменные (добавьте ВСЕ четыре):

| Key (Название) | Value (Значение) | Environment |
|----------------|------------------|-------------|
| `NEXT_PUBLIC_OPEN_WEATHER_API_KEY` | `60b86f5b92cd26bc6464fbd711568d44` | Production, Preview, Development |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | `pk.eyJ1Ijoic2F5dXJpaWkiLCJhIjoiY21ocm1nMTUxMHl6eDJpczQ0azgwbTA5NSJ9._PvbqROoQdgV18hTsCuoYQ` | Production, Preview, Development |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `AIzaSyBEwWrU2M35pry2JBp4NzpcT9W5RBduBKc` | Production, Preview, Development |
| `VERCEL_URL` | (оставьте пустым - Vercel установит автоматически) | Не добавляйте вручную |

**Примечание:** `VERCEL_URL` устанавливается Vercel автоматически и содержит URL текущего деплоя.

**Важно:** Выберите все три окружения (Production, Preview, Development) для каждой переменной!

### После добавления переменных:

1. Нажмите **"Save"** для каждой переменной
2. Перейдите в **Deployments**
3. Нажмите на три точки (...) у последнего деплоя
4. Выберите **"Redeploy"** → **"Use existing Build Cache"** снимите галочку → **"Redeploy"**

### Где получить ключи:

#### 1. OpenWeather API Key
- Зарегистрируйтесь на [openweathermap.org](https://openweathermap.org/api)
- Создайте бесплатный API ключ в разделе "API keys"
- Используется для получения данных о погоде

#### 2. Mapbox Access Token
- Зарегистрируйтесь на [mapbox.com](https://www.mapbox.com/)
- Создайте **публичный** access token (начинается с `pk.`)
- Используется для интерактивной карты

#### 3. Google Maps API Key
- Создайте проект в [Google Cloud Console](https://console.cloud.google.com/)
- Включите **Places API** и **Geolocation API**
- Создайте API ключ
- Используется для автодополнения поиска городов

## Шаг 3: Проверка переменных окружения (DEBUG)

После добавления переменных и деплоя, проверьте что они доступны:

Откройте: `https://ваш-проект.vercel.app/api/debug`

Вы должны увидеть:
```json
{
  "hasOpenWeatherKey": true,
  "hasMapboxToken": true,
  "hasGoogleMapsKey": true,
  "nodeEnv": "production",
  "openWeatherKeyPreview": "60b8...8d44"
}
```

**Если все значения `false`** - переменные НЕ установлены! Вернитесь к Шагу 2.

## Шаг 4: Настройка деплоя

Vercel автоматически определит Next.js проект и настроит сборку.

### Параметры сборки (по умолчанию):
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## Шаг 5: Деплой

1. Нажмите "Deploy"
2. Дождитесь завершения сборки
3. Ваше приложение будет доступно по адресу `https://your-project.vercel.app`
4. **ОБЯЗАТЕЛЬНО проверьте `/api/debug`** как описано в Шаге 3

## PWA функциональность

После деплоя приложение будет работать как Progressive Web App:
- ✅ Устанавливается как нативное приложение на мобильных устройствах
- ✅ Работает офлайн (через service worker)
- ✅ Push-уведомления
- ✅ Геолокация

## Важные заметки

- **Не коммитьте** файл `.env` или `.env.local` в репозиторий
- Все API ключи должны быть добавлены только в настройках Vercel
- Service worker будет работать только на HTTPS (Vercel автоматически предоставляет SSL)
- Для корректной работы PWA приложение должно быть доступно по HTTPS

### Архитектура для Vercel

Приложение использует прямые вызовы к внешним API (OpenWeather, Open-Meteo) из Server Components, минуя внутренние API routes. Это решает ограничение Vercel, где Server Components не могут делать fetch к собственным публичным URL в serverless окружении.

## Обновление приложения

После пуша новых изменений в репозиторий, Vercel автоматически:
1. Обнаружит изменения
2. Запустит новую сборку
3. Задеплоит обновленную версию

## Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
