FROM node:12-alpine

WORKDIR /app

COPY . .

EXPOSE 3111

CMD [ "npm", "start" ]