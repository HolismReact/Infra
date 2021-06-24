FROM node:lts-alpine
WORKDIR /react/Infra
RUN apk update \
    && apk add --no-cache git \
    && apk add --upgrade unzip \
    && cd /react \
    && git clone https://github.com/HolismReact/Infra \
    && cd /react/Infra \
    && npm install