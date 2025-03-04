FROM node:22

WORKDIR /client

COPY *.json .

RUN npm i

COPY . .

RUN npm run build

CMD [ "npm", "run", "serve" ]