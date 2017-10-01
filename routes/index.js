var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

//Get Userlist page
router.get('/userlist', function(req,res){
  var db =req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

//Get new User page
router.get('/newuser', function(req,res){
  res.render('newuser', { title: 'Add New User'});
});

//POST to Add User services
router.post('/adduser', function(req,res){
  // Set our internav DB variable
  var db = req.db;

  // Get our form values. THese rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  //Submit to the DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function(err, doc){
    if (err){
      //if it failed to return error
      res.send("There was a problem adding the information to the database.");
    }
    else{
      //And forwar to success page
      res.redirect("userlist");
    }
  });
});

module.exports = router;
