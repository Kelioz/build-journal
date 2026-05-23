# Журнал работ — Фронтенд (React + TypeScript + Vite)

Коротко: это фронтенд-приложение для проекта «Журнал работ на строительном объекте». Клиент реализован на React + TypeScript, собран с помощью Vite и использует Ant Design для интерфейса. API взаимодействует с backend (NestJS + Prisma), описан в OpenAPI/Swagger и расположен отдельно.

---

## Что внутри

- Интерактивный UI для просмотра, создания и редактирования записей журнала работ.
- Сгенерированный клиент API находится в `src/shared/api/client` (Orval/OpenAPI).
- Страницы: список записей (`src/pages/JournalList.tsx`) и форма создания/редактирования (`src/pages/JournalForm.tsx`).

---

## Быстрый старт — локальная разработка

1. Установите зависимости:

```bash
yarn install
```

2. Создайте файл окружения (опционально) — `.env` в корне проекта и укажите адрес API:

```env
VITE_API_BASE_URL=http://localhost:3000
```

3. Запустите dev-сервер:

```bash
yarn dev
```

4. Откройте приложение в браузере по адресу, который выдаст Vite (обычно `http://localhost:5173`).

---

## Скрипты (из `package.json`)

- `dev` — запуск в режиме разработки
- `build` — сборка production
- `preview` — локальный просмотр собранной версии

Проверьте `package.json` в корне для точных команд.

---

## Конфигурация API / интеграция с backend

- Переменная окружения: `VITE_API_BASE_URL` — базовый URL API (например, `http://localhost:3000`).
- Клиент API сгенерирован исходя из `openapi/openapi.yml` и размещён в `src/shared/api/client`.
- Рекомендуемые эндпоинты backend (см. Swagger backend):
  - `GET /work-types` — список видов работ (для селекта в форме)
  - `GET /journal?from=YYYY-MM-DD&to=YYYY-MM-DD&sort=asc|desc` — список записей
  - `POST /journal` — создать запись
  - `GET /journal/:id` — получить запись
  - `PUT /journal/:id` — обновить запись
  - `DELETE /journal/:id` — удалить запись

- Swagger UI backend доступен по `http://localhost:3000/api` после запуска сервера — там можно посмотреть схемы и примеры запросов.
