TERMINAL
* When you first open Terminal Type : bash
* Go to ~/
* Run every time you make change to  bash_profile file……     ==> source ~/.bash_profile

alias mongod='brew services run mongodb-community'
alias mongod-status='brew services list'

Run mongod

1. Create New Directory called XXXXXXXX

2. Run "npm init -y"

Install body-parser, mongoose, ejs, and express
3. Run "npm i express body-parser ejs"
4. Run "npm i mongoose"

5. Create a new file called app.js
    Run "touch app.js"


6.Inside app.js add server code (Write/copy)
Or go to https://github.com/londonappbrewery/Build-your-own-restful-api
scroll down to get the code for app.js

7. Setup MongoDB
  DB name is wikiDB
  Collection name is articles
  Document has two fields: title and content

8. Open another terminal Cntrl + T and from Wiki-API directory,
    Run:  "nodemon app.js"
    you should see this:
    [nodemon] starting `node app.js`
    Server started on port 3000

9. go to Chrome and go to http://localhost:3000/
   you should see: Cannot GET /


  alias mongod='brew services run mongodb-community'
  alias mongod-status='brew services list'
  alias mongod-stop='brew services stop mongodb-community'

  alias mongod-cli='mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork'
  alias mongod-kill='sudo pkill -f mongod'

//////////////////////////////
  GIT github
  1. sudo git add .
  2. sudo git commit -m "Add Environment Vars"
  3. sudo git push -u origin master

//////////////////////////////
 (LEVEL 1) Register Users with Login and password

//////////////////////////////
 (LEVEL 2) Database Encryption

  Mongoose encryption : https://www.npmjs.com/package/mongoose-encryption
  Run "npm i mongoose-encryption"

//////////////////////////////
(LEVEL 3) Hashing passwords (uses md5)

Password + Key ----(Cipher Method)----> Cipher Text
Caesar Cipher = Weak encryption
Hashing :::::>  Password ----(Hash function)----> Hash

To Install md5, Run "npm i md5"

//////////////////////////////
(LEVEL 4) Hashing and Salting (uses bcrypt)

Password + Random Salting characters  ----(Hash function)----> Hash
In the database we would save SALT and Hash
Using latest GPU, you can generate 20 Billion MD5 Hashes / second

17,000 bcrypt hashes/second (INDUSTRY STANDARD!!! With latest GPU, you can only generate 17,000 bycrypt hash/sec)
You can do multiple rounds of SALTING

Password + Random Salt_1 ------> Hash_1 + Random Salt_2 ------> Hash_2
in this case you would have to save Salt_1 , Salt_2 and Hash_2

To Install bcrypt, Run "npm i bcrypt"

//////////////////////////////
(LEVEL 5) Using Passport.js to Add Cookies and Sessions

To Install passport,
Run "npm i passport passport-local passport-local-mongoose express-session"

//////////////////////////////
(LEVEL 6) 3rd Party OAUTH - Open Authorization

Run "npm install passport-google-oauth20"
Run "npm install mongoose-findorcreate"
