FROM node:8-alpine

WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN npm install

COPY server.js .
ADD /public public
ADD /views views

EXPOSE 80
CMD npm start