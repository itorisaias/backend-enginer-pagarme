FROM node:10.15.3-alpine

WORKDIR /app/pagarme

COPY package.json .

RUN npm install --only=production

COPY src src

ENTRYPOINT [ "npm", "start" ]
