FROM node:22

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate
RUN node prisma/seed.js

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
