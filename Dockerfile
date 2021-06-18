FROM node:lts-alpine
RUN apk update
RUN apk add --no-cache git
RUN apk add --upgrade unzip
WORKDIR /app
RUN git clone https://github.com/HolismReact/Host
WORKDIR /app/Host
RUN npm install