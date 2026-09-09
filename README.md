# SEO-Джарвис — кабинет клиента

Отдельный фронтенд кабинета автоматизации. Логин на корне домена, после входа — тот же функционал, что на `https://rsd-ai.ru/custom/automations/2`.

Браузер ходит только на этот хост. Nginx проксирует `/api` и `/media` на основной сервер RSD. JWT клиента кладётся в `Authorization: Bearer`.

## Локально

```bash
cp .env.example .env
npm install
npm run dev
```

Vite проксирует `/api` и `/media` на `https://rsd-ai.ru`. Логин — клиентские учётки автоматизации, не админ RSD.

## Деплой на сервер клиента

```bash
cp .env.example .env
# при необходимости поправьте PORT и название
docker compose up -d --build
```

Перед кабинетом поставьте свой nginx/Caddy с TLS и проксированием на `127.0.0.1:80`.

Вебхуки DMP и Telegram остаются на `https://rsd-ai.ru` — их менять не нужно.

## Переменные

| Переменная | Назначение |
|---|---|
| `API_UPSTREAM` | Куда nginx проксирует `/api` и `/media` |
| `VITE_AUTOMATION_ID` | Id автоматизации (по умолчанию `2`) |
| `VITE_APP_NAME` | Название на странице входа |
