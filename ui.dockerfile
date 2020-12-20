FROM node:latest as builder
LABEL maintainer="yurikua11@gmail.com"
WORKDIR /opt/web
EXPOSE 4200
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build --prod

FROM nginx
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/web/dist/angular-gl-social-network /usr/share/nginx/html
