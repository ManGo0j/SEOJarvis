FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL=
ARG VITE_AUTOMATION_ID=2
ARG VITE_APP_NAME=SEO-Джарвис
ARG VITE_APP_TAGLINE=Кабинет автоматизаций

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_AUTOMATION_ID=${VITE_AUTOMATION_ID}
ENV VITE_APP_NAME=${VITE_APP_NAME}
ENV VITE_APP_TAGLINE=${VITE_APP_TAGLINE}

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
