# Настройка для деплоя на Vercel

## Шаг 1: Импорт проекта в Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "Add New" → "Project"
3. Импортируйте репозиторий `https://github.com/Saaayurii/Weather-diplom.git`

## Шаг 2: Настройка переменных окружения

В настройках проекта на Vercel добавьте следующие **Environment Variables**:

### Обязательные переменные:

```
NEXT_PUBLIC_OPEN_WEATHER_API_KEY=ваш_ключ_openweather
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=ваш_публичный_токен_mapbox
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=ваш_ключ_google_maps
```

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

## Шаг 3: Настройка деплоя

Vercel автоматически определит Next.js проект и настроит сборку.

### Параметры сборки (по умолчанию):
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## Шаг 4: Деплой

1. Нажмите "Deploy"
2. Дождитесь завершения сборки
3. Ваше приложение будет доступно по адресу `https://your-project.vercel.app`

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

## Обновление приложения

После пуша новых изменений в репозиторий, Vercel автоматически:
1. Обнаружит изменения
2. Запустит новую сборку
3. Задеплоит обновленную версию

## Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
