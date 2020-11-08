FROM node:lts-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build /usr/src/app /usr/src/app
COPY . .
RUN npm install --only=prod
CMD ["npm","start"]
