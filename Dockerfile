FROM node:20-alpine

WORKDIR /app

ENV NPM_CONFIG_REGISTRY=https://mirrors.cloud.tencent.com/npm/

COPY package*.json ./
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
