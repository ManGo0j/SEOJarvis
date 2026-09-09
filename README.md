# SEO-Джарвис — кабинет клиента

Отдельный фронтенд кабинета автоматизации. Логин на корне домена, после входа — тот же функционал, что на `https://rsd-ai.ru/custom/automations/2`.

Браузер ходит только на этот хост. Nginx проксирует `/api` и `/media` на основной сервер RSD. JWT клиента кладётся в `Authorization: Bearer`.

Контейнер кабинета слушает **только localhost** (`127.0.0.1:8080`). Снаружи должен быть HTTPS: публичные 80/443 держит nginx или Caddy, HTTP только редиректит на HTTPS.

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
# название кабинета при необходимости поправьте в .env
docker compose up -d --build
```

`VITE_*` запекаются **на сборке**. После смены этих переменных нужен повторный `--build`.

С сервера должен быть исходящий HTTPS на `rsd-ai.ru` (прокси `/api` и `/media`).

Вебхуки DMP и Telegram остаются на `https://rsd-ai.ru` — их менять не нужно.

### HTTPS, если на хосте уже есть nginx или Caddy

Кабинет: `http://127.0.0.1:8080`. Публичные 80 и 443 не трогайте у контейнера.

- nginx: скопируйте `deploy/nginx-site.conf.example`, подставьте домен, выпустите сертификат (`certbot --nginx`).
- Caddy на хосте: `deploy/Caddyfile.host` (подставьте домен).

Порт 80 с интернета нужен только прокси: ACME (Let's Encrypt) и редирект на HTTPS.

### HTTPS из коробки (Caddy в Docker)

Если на хосте **нет** своего nginx/Caddy на 80/443:

```bash
# в .env раскомментируйте и заполните:
# CABINET_DOMAIN=cabinet.example.com
# ACME_EMAIL=admin@example.com

docker compose -f docker-compose.yml -f docker-compose.tls.yml up -d --build
```

DNS A/AAAA домена должны указывать на этот сервер. Caddy сам выпустит сертификат и закроет HTTP редиректом на HTTPS.

## Переменные

| Переменная | Назначение |
|---|---|
| `BIND_HOST` | Адрес публикации порта. По умолчанию `127.0.0.1`. Не ставьте `0.0.0.0`. |
| `PORT` | Порт на хосте (по умолчанию `8080`). Внутри контейнера всегда `80`. |
| `API_UPSTREAM` | Куда nginx проксирует `/api` и `/media` |
| `VITE_AUTOMATION_ID` | Id автоматизации (по умолчанию `2`). Менять только по согласованию. |
| `VITE_APP_NAME` | Название на странице входа |
| `CABINET_DOMAIN` | Домен кабинета. Нужен только с `docker-compose.tls.yml` |
| `ACME_EMAIL` | Почта для Let's Encrypt. Нужна только с `docker-compose.tls.yml` |
