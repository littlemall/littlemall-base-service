# setting node.js version
FROM node:12.13.0
# make dir
RUN mkdir -p /Users/ronghua.wu/prod/littlemall-nodejs
# setting dir
WORKDIR /Users/ronghua.wu/prod/littlemall-nodejs
# copy package.json  to workspace
COPY package.json /Users/ronghua.wu/prod/littlemall-nodejs/package.json
# install npm package
RUN npm i
# copy source code to workspace
COPY . /Users/ronghua.wu/prod/littlemall-nodejs
# epxort port
EXPOSE 7001
# RUN npm rebuild
# startup the node service
CMD npm start