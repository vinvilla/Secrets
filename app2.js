//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//const encrypt = require('mongoose-encryption');
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;


const app = express();

//console.log(md5("123456"));
console.log(process.env.API_KEY);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: true
  //.cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

//mongoose.set("useCreateIndex",true);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

//userSchema.plugin(encrypt, { secret : process.env.SECRET , encryptedFields: ["password"]});
// https://mongoosejs.com/docs/plugins.html

const User = new mongoose.model("User", UserSchema);
//module.exports = mongoose.model("User", UserSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static("public"));

//TODO
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/secrets", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

//https://www.npmjs.com/package/express-session
app.post("/register", function(req, res) {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login", function(req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});


// app.post("/register", function(req, res) {
//
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
//     const newUser = new User({
//       email: req.body.username,
//       password: hash
//       //password: md5(req.body.password)
//     });
//     newUser.save(function(err) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render("secrets");
//       }
//     });
//   });
// });

// app.post("/login", function(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   //const password = md5(req.body.password);
//   User.findOne({
//       email: username
//     },
//     function(err, foundUser) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (foundUser) {
//           // Load hash from your password DB.
//           bcrypt.compare(password, foundUser.password, function(err, result) {
//             if (result === true) {
//               //if (foundUser.password === password) {
//               //console.log(foundUser.password);
//               res.render("secrets");
//             }
//           });
//         }
//       }
//     });
// });





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
