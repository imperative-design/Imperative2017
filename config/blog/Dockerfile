#docker build -t imperative/web:0.1 -f config/site/Dockerfile .
#docker run -p 3000:3000 bd15c238d2f3 

FROM ghost as blog

# RUN apt-get update && apt-get install -y \
# 	inotify-tools \
# 	&& apt-get install vim -y

# Create app directory
WORKDIR /var/www/

#Copy the build files
# COPY dist /var/www/intengo-workspace/dist
# COPY libs /var/www/intengo-workspace/libs
COPY package.json public/manifest.json Procfile server.js icon.png /var/www/
RUN npm install

RUN npm rebuild node-sass
# RUN npm rebuild node-sass --force

COPY insights/ /var/www/insights

EXPOSE 4200

CMD ["npm", "run", "blogdev"]
