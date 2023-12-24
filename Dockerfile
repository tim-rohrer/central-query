# --------------> The build image
FROM node:latest AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
COPY package*.json /
RUN npm ci --omit=dev

# --------------> The production image
FROM node:20.5.1-bookworm-slim

ENV NODE_ENV production
ENV MONGO_DB_NAME ${MONGO_DB_NAME}
ENV MONGO_URI ${MONGO_URI}
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY package*.json /app
COPY --chown=node:node --from=build node_modules node_modules
COPY --chown=node:node dist /app/dist/
CMD ["node", "/app/dist/index.js"]
