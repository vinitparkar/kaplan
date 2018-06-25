FROM node:8
WORKDIR /kaplan
COPY package*.json /kaplan
RUN npm install
COPY . /kaplan
EXPOSE 8080
CMD ["npm", "start"]
