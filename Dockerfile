FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn install --frozen-lockfile \
    && yarn cache clean

COPY . .
RUN yarn build

EXPOSE 19067

CMD ["yarn", "start"]
