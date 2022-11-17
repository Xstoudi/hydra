ARG NODE_IMAGE=node:18.12.1-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies_back
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM base AS dependencies_front
COPY --chown=node:node ./ui/package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies_front AS build_front
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
RUN cd ui && npm run build

FROM dependencies_back AS build_back
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node --from=build_back /home/node/app/build .
COPY --chown=node:node --from=build_front /home/node/app/ui/dist ./public
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
