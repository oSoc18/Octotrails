# Installing MEAN stack on the server

**OS:** Ubuntu 16.04
### Install mongodb: 
* sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
* echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
* sudo apt-get update
* sudo apt-get install -y mongodb-org
* echo "mongodb-org hold" | sudo dpkg --set-selections
* echo "mongodb-org-server hold" | sudo dpkg --set-selections
* echo "mongodb-org-shell hold" | sudo dpkg --set-selections
* echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
* echo "mongodb-org-tools hold" | sudo dpkg --set-selections

### Starting / stopping mongodb:  
* sudo service mongod start
* sudo service mongod stop
* sudo service mongod restart

### Begin using mongodb: 
* mongo --host 127.0.0.1:27017

### Install nodeje: 
* curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
* sudo apt-get install -y nodejs
* sudo apt-get install build-essential

*At this point, npm should be installed because it comes with nodejs. Try it by running: npm -v*

### Install bower: 
sudo npm install -g bower

### Install gulp: 
sudo npm install -g gulp

### Install command line interpreter: 
sudo npm install -g mean-cli
