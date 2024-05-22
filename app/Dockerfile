FROM  node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 300
RUN npm run build

CMD ["node", "dist/main.js"]
