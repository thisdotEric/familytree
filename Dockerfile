# Stage 1, Build the code
FROM node:16-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY web/package.json web/yarn.lock ./web/

# Install ALL the dependencies of the server and webapp 
RUN yarn install --frozen-lockfile
RUN yarn --cwd web/ install --frozen-lockfile

COPY . ./

# Build the server
RUN yarn build 

# Build the webapp
RUN yarn --cwd web/ build

# Stage 2, create the production image
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/web/package.json ./web/package.json

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/web/build ./web/build

RUN yarn install --production --frozen-lockfile
RUN yarn --cwd ./web/ install --production --frozen-lockfile

EXPOSE 4000
CMD node dist/server.js