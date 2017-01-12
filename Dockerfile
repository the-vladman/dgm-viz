# Pull base image.
FROM nginx

COPY default.conf /etc/nginx/conf.d

RUN mkdir -p /usr/share/nginx/html/visualizaciones/

COPY ./visualizaciones/ /usr/share/nginx/html/visualizaciones/

WORKDIR /usr/share/nginx/html/visualizaciones

# Install Node.js
RUN apt-get update && \
	apt-get install -y git-core curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

RUN rm -rf bower_install && node -v
RUN npm install -g bower
RUN bower --allow-root install

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
