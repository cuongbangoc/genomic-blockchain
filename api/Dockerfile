# STAGE 1
FROM node:18-bullseye-slim as package
MAINTAINER Cuong Ba <bangoccuong@gmail.com>

RUN node -v && npm -v
RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock /usr/src/node-app/
USER node
ENV NODE_ENV=production
RUN yarn install --production=true --pure-lockfile


FROM node:18-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app
USER node
WORKDIR /usr/src/node-app

COPY --from=package /usr/src/node-app/node_modules /usr/src/node-app/node_modules

COPY --chown=node:node . .

EXPOSE 3000

CMD ["dumb-init", "node", "src/index.js"]
