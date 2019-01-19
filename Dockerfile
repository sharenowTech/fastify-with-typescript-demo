FROM node:dubnium-alpine

WORKDIR /app

COPY . .

RUN npm install --no-progress --quiet
RUN npm run build

CMD [ "npm", "start"]