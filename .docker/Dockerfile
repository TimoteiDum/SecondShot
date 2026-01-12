FROM node:20-alpine

WORKDIR /app

COPY . .

RUN corepack enable
RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev"]
