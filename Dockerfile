FROM node:14.16.0 

WORKDIR /home/node/app

COPY . .
RUN npm i
EXPOSE 3001
CMD ["npm", "start"]