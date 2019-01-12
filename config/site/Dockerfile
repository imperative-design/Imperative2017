#docker build -t imperative/web:0.1 -f config/site/Dockerfile .
#docker run -p 3000:3000 bd15c238d2f3 

FROM node:9.7.1 as node

COPY package.json yarn.lock /
RUN npm install yarn -g
RUN apt-get update && apt-get install -y \
	inotify-tools \
	&& apt-get install vim -y

# RUN yarn global add webpack@~4.19.0 webpack-cli@~2.1.3 ndb
# RUN yarn add @angular/cli@6.0.1 --unsafe-perm && yarn

# Create app directory
WORKDIR /var/www/site

#Copy the build files
# COPY dist /var/www/intengo-workspace/dist
# COPY libs /var/www/intengo-workspace/libs
COPY node_modules /var/www/site
COPY .env package.json manifest.json Procfile server.js icon.png /var/www/site/
COPY public/ /var/www/site/public

RUN yarn

EXPOSE 3000

CMD ["npm", "start"]
