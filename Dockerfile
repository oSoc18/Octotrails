FROM node:10.6.0
WORKDIR /usr/src/app
COPY package.json ./
ENV MONGO_HOST mongodb://mongo:27017/octotrails-docker
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4040
EXPOSE 8081
EXPOSE 4200
CMD ["npm","start"]
