# Многоступенчатая сборка для оптимизации размера образа

# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

# Установка необходимых зависимостей для сборки нативных модулей
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev \
    fftw-dev \
    build-base \
    libc6-compat

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и lock файлов для установки зависимостей
COPY package.json yarn.lock package-lock.json* ./
COPY client/package.json ./client/
COPY api/package.json ./api/

# Копирование package.json из папки packages
COPY packages ./packages

# Установка зависимостей (игнорируем ошибки при установке optional зависимостей)
# sharp используется только для favicons и не критичен для работы приложения
RUN yarn install --frozen-lockfile --ignore-optional || \
    (yarn install --frozen-lockfile --ignore-scripts && yarn cache clean)

# Копирование всего исходного кода
COPY . .

# Сборка приложения с опциями для совместимости
ENV NODE_OPTIONS="--openssl-legacy-provider"
RUN yarn build

# Этап 2: Production образ
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Установка serve для раздачи статических файлов
RUN yarn global add serve

# Копирование собранного приложения из builder этапа (webpack собирает в public)
COPY --from=builder /app/public ./dist

# Порт по умолчанию
ENV PORT=3000

# Expose порта
EXPOSE 3000

# Запуск приложения
CMD ["serve", "-s", "dist", "-l", "3000"]
