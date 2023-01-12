FROM ethereum/solc:0.6.12 as build-deps

FROM node:14

WORKDIR /app
ADD  ./package-lock.json ./package.json /app/
RUN npm ci

ADD ./ /app/
