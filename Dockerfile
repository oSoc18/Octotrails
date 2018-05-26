FROM node:carbon
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
ENV MONGO_HOST mongodb://mongo:27017/mean
COPY . .
EXPOSE 4200
EXPOSE 4040
CMD ["npm", "start"]
