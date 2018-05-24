FROM node:carbon
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4200
EXPOSE 4040
CMD ["npm", "start"]
