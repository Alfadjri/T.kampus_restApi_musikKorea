FROM node
WORKDIR /usr/src/app
COPY ../../package*.json ./

RUN npm install 
COPY . .


# RUN echo "phpmyadmin phpmyadmin/dbconfig-install boolean false" | debconf-set-selections
# RUN apt-get update && apt-get install -y phpmyadmin 
# RUN mkdir -p /usr/src/app/src/public 
# RUN ln -s /usr/share/phpmyadmin /usr/src/app/src/public/phpmyadmin
EXPOSE 4000
