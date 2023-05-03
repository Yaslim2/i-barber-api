FROM node:16.14.0

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3000

RUN npx prisma generate

CMD ["yarn", "start:dev"]