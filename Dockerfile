# -------- Base ---------
# What image do you want to start building on?
FROM node:12-alpine AS base

# Tell your container where your app's source code will live
WORKDIR /app

# -------- Builder ---------
FROM base AS builder

COPY package*.json ./

RUN npm install

COPY ./src ./src

COPY ./public ./public

ARG REACT_APP_ENV
ENV REACT_APP_ENV=$REACT_APP_ENV

RUN npm run build

RUN npm prune --production

# -------- Release ---------
FROM nginx:1.16.0-alpine AS release

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

# What port will the container talk to the outside world with once created?
EXPOSE 80

# How do you start your app?
CMD ["nginx", "-g", "daemon off;"]