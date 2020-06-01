FROM node:10-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8000 9000 9001

CMD ["yarn", "start", "-H", "0.0.0.0"]
