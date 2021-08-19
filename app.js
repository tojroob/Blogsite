//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-james:Test123@cluster0.szn03.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true});

const homeStartingContent = "Welcome to my Blog Website!";
const aboutContent = "Budding Engineer!";
const contactContent = "Email: jytojroob@gmail.com";

const app = express();
const _ = require('lodash');

const blogSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", blogSchema) //creating a collection named blogpost

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

Post.find({}, function(err, posts){

  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  })
})

})



app.get("/about", function (req, res) {
  res.render("about", {
    aboutMe: aboutContent
  })
})

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactMe: contactContent
  })
})

app.get("/compose", function (req, res) {
  res.render("compose")
})

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err,post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.post("/compose", function (req, res) {

//save into mongoose database
const post = new Post ({
  title: req.body.postTitle,
  content: req.body.postBody
});

post.save(function(err){

if (!err) {
  res.redirect("/")
}

})

});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
