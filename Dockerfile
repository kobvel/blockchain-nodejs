FROM node:carbon

RUN mkdir /usr/src/app
COPY package*.json ./
RUN npm install

ENV WALLET_CONNECTED=true
RUN mkdir wallet
COPY blockchain-nodejs-wallet/. ./wallet/
RUN cd wallet && npm i && npm run build

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
