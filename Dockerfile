FROM node:16.13-alpine

# WORKDIR /usr/app

WORKDIR /opt/app

COPY . .

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]