FROM node:22

WORKDIR /app

COPY *.json .

RUN npm i

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "npm run migrate:prod && npm run prod"]
