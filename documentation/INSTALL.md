# Installing the project on the server

**OS:** Ubuntu 16.04

## MongoDB

### Install mongodb: 

Source: <https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/>

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org

### Starting / stopping mongodb:  

    sudo service mongod start
    sudo service mongod stop
    sudo service mongod restart

### Begin using mongodb: 

    mongo --host 127.0.0.1:27017

## NodeJS

Source: <https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions>

### Install nodejs: 

    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install build-essential

*At this point, npm should be installed because it comes with nodejs. Try it by running: npm -v*

### Install bower: 

    sudo npm install -g bower

### Install gulp: 

    sudo npm install -g gulp
    
## Nginx

    sudo apt-get install nginx
    
### SSL Certificate

Source : <https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx>

    sudo apt-get update
    sudo apt-get install software-properties-common
    sudo add-apt-repository ppa:certbot/certbot
    sudo apt-get update
    sudo apt-get install python-certbot-nginx
    
    sudo certbot --nginx
    
## Database

### Create database
    use octotrails

### Create user
    db.createUser({user: "octotrails", pwd: "octotrails", roles: ["readWrite", "dbAdmin"]})
    
    

