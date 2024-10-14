FROM node:22-alpine AS frontend

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

RUN ls -la /app/dist
FROM nginx:alpine AS prod

COPY --from=frontend /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443