<<<<<<< HEAD
FROM node:12.18.1


=======
FROM node:12-alpine
>>>>>>> ce4ce31567fbff1acdf3f86c30808972cd8b0571
# install simple http server for serving static content

# make the 'app' folder the current working directory
WORKDIR /app3

# copy both 'package.json' and 'package-lock.json' (if available)
<<<<<<< HEAD
COPY package*.json ./
COPY . .
# install project dependencies
RUN npm install && npm run build
COPY . .
# copy project files and folders to the current working directory (i.e. 'app' folder)


EXPOSE 9770
ENV host localhost
CMD [ "npm", "start" ]
=======
COPY . ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)

EXPOSE 8791
RUN npm run build

CMD [ "npm", "run", "dev" ]
>>>>>>> ce4ce31567fbff1acdf3f86c30808972cd8b0571
