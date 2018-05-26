FROM node:carbon
WORKDIR /usr/src/app
COPY package.json ./
ENV MONGO_HOST mongodb://mongo:27017/mean
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4040
CMD ["npm","run", "start-express"]
