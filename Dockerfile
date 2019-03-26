FROM node:10.15.3

RUN mkdir -p /app
WORKDIR /app

ENV NODE_ENV production

ADD package.json /app/
RUN npm install
ADD src /app/src/

CMD ["npm", "start"]