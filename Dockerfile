FROM node:18-alpine

WORKDIR /app

COPY *.json /app/

RUN npm i

COPY . ./app

EXPOSE 4002

CMD [ "npm", "run", "dev" ]