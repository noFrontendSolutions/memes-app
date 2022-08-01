FROM node:18
WORKDIR /memes-app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8081
CMD ["node", "dist/server/server.js"]