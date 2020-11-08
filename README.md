# STS Backend
![Node.js CI](https://github.com/davidsarkany/sts-backend/workflows/Node.js%20CI/badge.svg)
![Docker CI/CD](https://github.com/davidsarkany/sts-backend/workflows/Docker%20CI/CD/badge.svg)
[![license](https://badgen.net/github/license/davidsarkany/sts-backend)](https://github.com/davidsarkany/sts-backend/blob/master/LICENSE)

## Story
There is a law in Spain which enforce truck drivers to register in which autonomous region they are staying when they are taking a break. 
Three years ago I made a very-very simple Android application that sends GPS positions to a backend application. This backend application recognizes the region where the driver is staying. The previous backend application was really over-engineered, which supported multiple map providers and it had a self-hosted fallback provider. (I converted Spain region map to MySQL polygons and i wrote a selecting query)

I abandoned this project, but the Laravel framework in the previous backend reached its end of life. I don’t want to spend too much time to upgrade it, so I rewrote the application in TypeScript for learning purposes. The new application is much simpler than the previous one, and due to achieving compatibility, the code doesn't always follow the best practices. (E.g. status field in response)

## How to use
1. Register into [TomTom developer page](https://developer.tomtom.com/) and copy the API key.
2. Generate a long random string for health check token.


### Use with Docker
```
docker run -d \
            -e "TOMTOM_API_KEY=REPLEACE-WITH-YOUR-KEY" \
            -e "RATE_LIMIT_MAX=60" \
            -e "RATE_LIMIT_TIME_WINDOW=10 minute" \
            -e "PORT=8080" \
            -e "REVERSE_PROXY=enabled" \
            -e "HEALTH_CHECK_TOKEN=REPLEACE-WITH-YOUR-KEY" \
            -p 8080:8080 \
            docker.pkg.github.com/davidsarkany/sts-backend/sts-backend:latest
```

### Use with NPM
Rename the `.env.example` file to `.env`. \
Replace the TOMTOM_API_KEY and HEALTH_CHECK_TOKEN with your tokens. \
Run the following commands:
```
npm install
npm run build --if-present
npm start
```
