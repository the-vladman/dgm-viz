# Pull base image.
FROM nginx

# Create the application directory
RUN mkdir -p /usr/share/nginx/html/visualizaciones

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

COPY . /usr/share/nginx/html/visualizaciones

RUN ls -la /usr/share/nginx/html/visualizaciones

RUN npm install -g bower
RUN bower --allow-root install

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
