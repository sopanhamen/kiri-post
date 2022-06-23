FROM node:16.0.0

# WORKDIR /usr/app

WORKDIR /opt/app

COPY . .

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]