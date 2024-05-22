FROM  node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000
RUN npm run build

RUN ls -l /app/dist

CMD ["node", "dist/main"]
