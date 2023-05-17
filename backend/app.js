const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const body = require('body-parser');

const app = express();



const Post = require("./models/post");

app.use(body.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, Content-Type, X-Requested-With, Accept"
    );
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts',(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(210).json({"message": "Post added Successfully"});
});


app.use('/api/posts',(req, res, next) => {
  // const posts = [
  //   {id: "asdasd2asdasd", title: "First Post Title", content: "This post is from the server"},
  //   {id: "qweqwe12qweqw", title: "Second Post Title", content: "This post is from the server!!"}
  // ];

  Post.find()
  .then(documents => {
    res.status(200).json({
      message: "Post fetched successfully!",
      posts: documents
    });
  });


});

module.exports = app;
