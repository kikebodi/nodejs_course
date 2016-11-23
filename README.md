# Node.js course notes

## Basic node modules


To create a Node Module (in package.json).
\<Major Version\>.\<Minor Version\>.\<Patch\>

To specify the acceptable package version:
```
Exact: npm install express@4.0.0
Patch acceptable: npm install express@"~4.0.0"
Minor version acceptable: npm install express@"^4.0.0"
```


## Node and HTTP

HTTP core module:  <br>
`var http = require('http');`<br>
File system core module ():<br>
`var fs = require('fs');`<br>
Path core module: Make OS's independent paths<br>
`var path = require('path');`<br>


## Express module

Express is a Web application framework that provides a robust set of features.
To install it do: `npm install express --save`

Morgan is a logging modure that works with Express.
To install morga do: `npm install morgan --save`
Check `./node-express/server-2.js` to see how to.

HTTP <-> REST equivalence:
```
HTTP GET -> READ
HTTP POST -> CREATE
HTTP PUT -> UPDATE
HTTP DELETE -> DELETE
```
###Express router
```
app.all('/dishes', function(req,ser,next){...});
app.get('/dishes', function(req,ser,next){...});
app.post('/dishes', function(req,ser,next){...});
app.put('/dishes', function(req,ser,next){...});
app.delete('/dishes', function(req,ser,next){...});
```
other way to do this
```
dishRouter.route('/')
	.all(...);
	.get(...);
	.post(...);
	.put(...);
	.delete(...);
```

`app.get('/dishes/:dishId', function(req,ser,next){...});` With this we can use `dishId` as a variable.

To install body-parser
`npm install body-parser --save`

##Express Generator
To install Express generator type `npm install express-generator -g`
Then `express \<App name\>
After that go to the folder and type `npm install` to install the required modules.

##MongoDB
Install mongo DB driver for NodeJS
`npm install mongodb --save`
To test for conditions:
`npm install assert --save`


 mongod --dbpath=../mongodb/data/
 mongo
 node ...

##Mongoose ODM (object data model)
npm install mongoose --save

##REST API with Express, MongoDB and Mongoose
rest-server folder

##Basic Authentication
Authorization is a String (username:password) encoded with Base64.
"Authorization: Basic QWdhagsghghdsfghdfg=="
basic-auth folder

##Cookies and Express Sessions
As HTTP does not provide any method for User tracking, we should do it with Cookies or express-sesions.

Cookies:
npm install cookie-parser
basic-auth-cookies folder

Express sessions:
sudo npm install express-session session-file-store --save
basic-auth-session folder
The session cookies are in basic-auth-session/sessions


##User Authentication with Passport
npm install jsonwebtoken -save // to use JWT

###Passport module
Authentication middleware for Node.js

Supports:
 - Local strategy
 - OpenID
 - Oauth

npm install passport --save
For local strategy
npm install passport-local --save
Plugin to simplify building user/pass login with MongoDB and mongoose
npm install passport-local-mongoose --

##Mongoose Population
NoSQL databases do not explicitly support relations lies the SLQ databases. (ie: join()).

Population is the process of automatically replace specified paths within a document with documents from another collection.

mongoose-population folder.






