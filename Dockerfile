FROM node:12-alpine
# install simple http server for serving static content

# make the 'app' folder the current working directory
WORKDIR /app3

# copy both 'package.json' and 'package-lock.json' (if available)
COPY . ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)

EXPOSE 8791
RUN npm run build

CMD [ "npm", "run", "dev" ]