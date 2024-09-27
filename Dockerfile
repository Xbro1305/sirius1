FROM node:20.14-alpine
WORKDIR /usr/src/web
COPY package*.json ./
RUN npm install
COPY . .
