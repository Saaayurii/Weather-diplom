export default {
    // Navigation
    nav: {
        forecast: 'Прогноз',
        maps: 'Карты',
        settings: 'Настройки'
    },

    // Settings
    settings: {
        title: 'Настройки',
        forecast: {
            title: 'Прогноз',
            units: 'Единицы измерения',
            locations: 'Местоположения',
            locationsSaved: 'сохранено',
            sections: 'Разделы',
            sectionsDescription: 'Выберите разделы для отображения и их порядок',
            locationsDescription: 'Управление сохранёнными местоположениями',
            noLocations: 'Нет сохранённых мест',
            addLocation: 'Добавить местоположение'
        },
        maps: {
            title: 'Карты',
            defaultMap: 'Карта по умолчанию',
            display: 'Отображение',
            framerate: 'Частота кадров',
            displayDescription: 'Настройки отображения карт',
            opacity: 'Прозрачность',
            smoothing: 'Сглаживание',
            zoom: 'Масштаб',
            pitch: 'Наклон',
            preview: 'Предпросмотр'
        },
        general: {
            title: 'Общие',
            theme: 'Тема',
            update: 'Обновить',
            reset: 'Сбросить',
            about: 'О приложении',
            resetConfirm: 'Это сбросит все настройки до значений по умолчанию. Это действие нельзя отменить. Продолжить?',
            resetButton: 'Да, сбросить',
            version: 'Версия',
            author: 'Автор',
            license: 'Лицензия',
            source: 'Исходный код',
            description: 'Бесплатное прогрессивное погодное приложение с открытым исходным кодом',
            details: 'Детали',
            attribution: 'Атрибуция',
            sponsors: 'Спонсоры',
            forecastData: 'Данные прогноза',
            tideData: 'Данные приливов',
            mapsGeocoding: 'Карты/Геокодирование',
            radarImagery: 'Радарные изображения',
            logoDesign: 'Дизайн логотипа',
            icons: 'Иконки',
            github: 'Github',
            removeLocation: 'Удалить местоположение'
        },
        theme: {
            title: 'Тема',
            description: 'Выберите тему оформления',
            auto: 'Авто',
            light: 'Светлая',
            dark: 'Тёмная'
        },
        units: {
            metric: 'Метрическая',
            imperial: 'Имперская',
            hybrid: 'Гибридная'
        }
    },

    // Forecast sections
    forecast: {
        today: 'Сегодня',
        hourly: 'Почасовой прогноз',
        daily: 'Ежедневный прогноз',
        summary: 'Сводка',
        uvIndex: 'УФ-индекс',
        tides: 'Приливы',
        wind: 'Ветер',
        precipitation: 'Осадки',
        temperature: 'Температура',
        feelsLike: 'Ощущается как',
        humidity: 'Влажность',
        pressure: 'Давление',
        visibility: 'Видимость',
        cloudCover: 'Облачность',
        dewPoint: 'Точка росы',
        sunrise: 'Восход',
        sunset: 'Закат',
        moonPhase: 'Фаза луны',
        high: 'Максимум',
        low: 'Минимум',
        chance: 'Вероятность',
        amount: 'Количество',
        sections: {
            dailyForecast: 'Ежедневный прогноз',
            hourlyForecast: 'Почасовой прогноз',
            today: 'Сегодня',
            uvIndex: 'УФ-индекс',
            tides: 'Приливы'
        }
    },

    // Maps
    maps: {
        types: {
            radar: 'Радар',
            precipitation: 'Осадки',
            temperature: 'Температура',
            clouds: 'Облачность',
            wind: 'Ветер',
            pressure: 'Давление'
        },
        controls: {
            play: 'Воспроизвести',
            pause: 'Пауза',
            timeline: 'Временная шкала',
            recentre: 'Перецентрировать'
        },
        legend: {
            lightDrizzle: 'Лёгкая морось',
            drizzle: 'Морось',
            lightRain: 'Слабый дождь',
            rain: 'Дождь',
            heavyRain: 'Сильный дождь',
            thunderstorm: 'Гроза',
            hail: 'Град'
        }
    },

    // Location
    location: {
        search: 'Поиск местоположения',
        current: 'Текущее местоположение',
        saved: 'Сохранённые места',
        add: 'Добавить',
        remove: 'Удалить',
        noResults: 'Ничего не найдено',
        unknown: 'Неизвестно',
        setLocation: 'Установить местоположение',
        update: 'Обновить'
    },

    // Days of week
    days: {
        short: {
            sun: 'Вс',
            mon: 'Пн',
            tue: 'Вт',
            wed: 'Ср',
            thu: 'Чт',
            fri: 'Пт',
            sat: 'Сб'
        },
        full: {
            sunday: 'Воскресенье',
            monday: 'Понедельник',
            tuesday: 'Вторник',
            wednesday: 'Среда',
            thursday: 'Четверг',
            friday: 'Пятница',
            saturday: 'Суббота'
        }
    },

    // Weather conditions
    weather: {
        clear: 'Ясно',
        cloudy: 'Облачно',
        partlyCloudy: 'Переменная облачность',
        rain: 'Дождь',
        snow: 'Снег',
        sleet: 'Мокрый снег',
        fog: 'Туман',
        thunderstorm: 'Гроза',
        wind: 'Ветрено'
    },

    // Common
    common: {
        save: 'Сохранить',
        cancel: 'Отмена',
        close: 'Закрыть',
        ok: 'ОК',
        yes: 'Да',
        no: 'Нет',
        loading: 'Загрузка...',
        error: 'Ошибка',
        retry: 'Повторить',
        none: 'Нет',
        all: 'Все'
    }
};
