FROM node:lts-alpine 
COPY package.json ./
RUN npm install
RUN mkdir /app-ui
RUN mv ./node_modules ./app-ui
WORKDIR /app-ui

COPY . .

# RUN npm install

EXPOSE 3000

CMD ["npm", "start"]