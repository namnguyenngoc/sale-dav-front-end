FROM node:12.18.1


# install simple http server for serving static content

# make the 'app' folder the current working directory
WORKDIR /app3

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
COPY . .
# install project dependencies
RUN npm install && npm run build
COPY . .
# copy project files and folders to the current working directory (i.e. 'app' folder)


EXPOSE 9770
ENV host localhost
CMD [ "npm", "start" ]