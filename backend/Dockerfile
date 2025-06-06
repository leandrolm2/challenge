FROM node:22

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

RUN npx prisma db seed

EXPOSE 4000

CMD ["npm", "run", "start"]