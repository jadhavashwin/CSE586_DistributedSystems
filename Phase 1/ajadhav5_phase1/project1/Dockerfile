FROM node:latest

RUN mkdir -p /ds_project_1

WORKDIR /ds_project_1

COPY package*.json /ds_project_1

RUN npm install

COPY . /ds_project_1