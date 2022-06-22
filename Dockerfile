FROM node:14.15.4-alpine

# WORKDIR /usr/app

WORKDIR /opt/app

COPY . .

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]