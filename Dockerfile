FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

RUN npx husky install

EXPOSE 3000

CMD ["npm", "run", "start:prod"]