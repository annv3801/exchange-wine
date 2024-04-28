FROM node:18
# Create app directory
WORKDIR /app

EXPOSE 19067

# Copy config and built files
COPY package.json /app
COPY . .
RUN ls
#COPY .env.* /app
# Install app dependencies
RUN apt update --allow-insecure-repositories
RUN apt install tree -y
#RUN npm cache --force clean
#RUN npm install --force node-sass
RUN yarn cache clean --force
RUN yarn install
RUN yarn global add serve
RUN ls
RUN yarn build || echo "Build failed"
RUN ls
RUN pwd
RUN if [ -d "build/static/js" ]; then rm -rf build/static/js/*.map; fi
RUN ls -la
RUN if [ -d "build" ]; then tree -a build; else echo "Build directory does not exist"; fi
RUN if [ -d "build/static/js" ]; then ls build/static/js; else echo "build/static/js directory does not exist"; fi