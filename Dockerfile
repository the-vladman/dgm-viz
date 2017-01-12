# Pull base image.
FROM nginx

COPY default.conf /etc/nginx/conf.d/

COPY ./visualizaciones /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/visualizaciones

# Install Node.js
RUN apt-get update && \
	apt-get install -y git-all && \	
	apt-get install -y curl && \
	curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
	apt-get install -y nodejs && \
	apt-get purge -y curl apt-transport-https && \
	apt-get autoremove -y && \
apt-get clean all

RUN npm install -g bower
RUN bower --allow-root install

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
