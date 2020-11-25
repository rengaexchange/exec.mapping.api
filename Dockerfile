FROM node:10.15.0-jessie

RUN node -v
RUN npm -v

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app

# install app dependencies to ensure package.json AND package-lock.json are copied
COPY package*.json /usr/src/app/

# bundle app source
COPY . /usr/src/app

#installing npm node_modules
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]