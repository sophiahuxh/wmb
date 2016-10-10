# VERSION 1.0
# DOCKER-VERSION 1.12.1
# To build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:gasi/docker-node-hello.git
# 3. Build container: docker build .

FROM    wmb-jsgrid

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y -q npm

# App
ADD . /src
# Install app dependencies
RUN cd /src; npm install

EXPOSE  80
CMD ["node", "/src/keystone.js"]