FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install 

COPY . .

RUN npm install pm2 -g

CMD ["pm2-runtime", "index.js"]
