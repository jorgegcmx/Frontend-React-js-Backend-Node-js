# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

ENV REACT_APP_SERVICIO=http://localhost:3322/entradas

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package*.json /react-app

RUN npm install

# Copying all the files in our project
COPY . .

RUN  npm start

EXPOSE 3000

# Starting our application
CMD ["npm","start]