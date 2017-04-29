# Dashboard Template Starter - Angular Meteor with JavaScript ES6; Material design (CSS)
This project uses latest Meteor, AngularJS, Google Material Design, and Mongo DB. Great for starting new projects.

# Set up Development env
1. [Install Meteor](https://www.meteor.com/install)
2. [Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition)
2. cd <project directory>
3. meteor npm install
4. meteor

# HOW TO DEPLOY ON DIGITALOCEAN
# [SERVER]
* apt-get install nginx mongodb-server

# see which ports are used
* netstat -ntlp | grep LISTEN

# Start mongo:
* docker run -p 27017:27017 --name mongodb -d mongo

# configure nginx in:
* https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx
* * Only to step 1 or 2 ^.
* vi /etc/nginx/sites-enabled/tropikult.com
* nginx -s reload
* Meteor is running on port 3000, but nginx forwards port 80 (default traffic) to 3000.

# firewall settings:
* https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands
* ufw status
* sudo ufw allow from any to any port 27017
* sudo ufw allow https
* sudo ufw allow http


# [LOCAL]
* mup https://www.digitalocean.com/community/questions/deploying-a-meteor-app-with-mup-to-a-droplet
* cd .deploy/
* mup.cmd setup
* mup.cmd deploy
