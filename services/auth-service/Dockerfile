FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
RUN apk add --no-cache mysql-client

EXPOSE 3000

CMD ["sh", "./start.sh"]