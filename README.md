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


##HTTPS and Secure Communication
https-rest-server-passport folder

##OAuth and Users Authentication
OAuth-rest-server-passport folder

##Backend as a Service (BaaS)
Advantages:
- Pre-built, tried and tested components
- Reducion in server-side development effort
- Recent technological developments integrated by the service provider and made accessible to developers.

Disadvantages:
- Black box
- Vendor lock-in
- Loss of flexibility
- Additional training needed in vendor-specific APIs

Exercise:
npm install strongloop -g

slc loopback (and follow instructions)
cd folder
sudo npm install
slc loopback:model (and define the atributes of a document)
slc loopback:relation (to define relationships) 
[ie. to join dishes with comments]
```
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:relation
? Select the model to create the relationship from: dishes
? Relation type: has many
? Choose a model to create a relationship with: Comments
? Enter the property name for the relation: comments
? Optionally enter a custom foreign key: 
? Require a through model? No
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:relation
? Select the model to create the relationship from: dishes
? Relation type: has many
? Choose a model to create a relationship with: Customer
? Enter the property name for the relation: customers
? Optionally enter a custom foreign key: 
? Require a through model? No
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:relation
? Select the model to create the relationship from: Comments
? Relation type: belongs to
? Choose a model to create a relationship with: dishes
? Enter the property name for the relation: dishes
? Optionally enter a custom foreign key: 
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:relation
? Select the model to create the relationship from: Comments
? Relation type: belongs to
? Choose a model to create a relationship with: Customer
? Enter the property name for the relation: customer
? Optionally enter a custom foreign key: customerId
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:relation
? Select the model to create the relationship from: Customer
? Relation type: has many
? Choose a model to create a relationship with: Comments
? Enter the property name for the relation: comments
? Optionally enter a custom foreign key: customerId
? Require a through model? No
```
[example. Define access permissions for Comments collection]
```
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:acl
? Select the model to apply the ACL entry to: dishes
? Select the ACL scope: All methods and properties
? Select the access type: Write
? Select the role other
? Enter the role name: admin
? Select the permission to apply Explicitly grant access
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:acl
? Select the model to apply the ACL entry to: (all existing models)
? Select the ACL scope: All methods and properties
? Select the access type: All (match all types)
? Select the role All users
? Select the permission to apply Explicitly deny access
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:acl
? Select the model to apply the ACL entry to: Comments
? Select the ACL scope: All methods and properties
? Select the access type: Read
? Select the role Any authenticated user
? Select the permission to apply Explicitly grant access
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:acl
? Select the model to apply the ACL entry to: Comments
? Select the ACL scope: A single method
? Enter the method name create
? Select the role Any authenticated user
? Select the permission to apply Explicitly grant access
Enriques-MacBook-Pro:loopback-server Kike$ slc loopback:acl
? Select the model to apply the ACL entry to: Comments
? Select the ACL scope: All methods and properties
? Select the access type: Write
? Select the role The user owning the object
? Select the permission to apply Explicitly grant access
Enriques-MacBook-Pro:loopback-server Kike$ 
```
//Start server
slc start (or node .)

##MongoDB commands
show dbs
use <db name>
show collections
db.collectionName.find() //show all the data in a collection
db.collectionName.drop() //delete that collection
{
"username":"",
"password":""
}