FROM node:16-alpine as base

 RUN mkdir -p /src/user/app
WORKDIR /src/user/app

COPY package*.json ./

EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "app.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "app.js"]