FROM node:16.14.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn prisma:generate

COPY . .

CMD ["yarn", "start:dev"]

