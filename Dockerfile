FROM node:lts-alpine
RUN apk update
RUN apk add --no-cache git
WORKDIR /holism/react
RUN git clone https://github.com/HolismReact/Host
WORKDIR /holism/react/Host
RUN npm install