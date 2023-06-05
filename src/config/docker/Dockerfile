FROM node
WORKDIR /usr/src/app/src
COPY ../../package*.json ./

RUN npm install

COPY . .


RUN apt-get update && apt-get install -y phpmyadmin
RUN ln - s /usr/share/phpmyadmin /usr/src/app/src/public/phpmyadmin

EXPOSE 4000

CMD ["npm","start"]
