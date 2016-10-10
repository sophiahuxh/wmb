# VERSION 1.0
# DOCKER-VERSION 1.12.1
# To build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:gasi/docker-node-hello.git
# 3. Build container: docker build .

FROM    node

# App
ADD . /src
# Install app dependencies
RUN cd /src; npm install

EXPOSE  3000
CMD ["node", "/src/keystone.js"]
