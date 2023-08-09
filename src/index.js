const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const port = 3000;

const app = express();
app.use(express.json())

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const latLong = require('./routes/latLongRoute');

// Task 1 : Setting up node and mongoose connectivity.

mongoose.connect('mongodb://127.0.0.1:27017/Knovator').then(
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
).catch((err) => {
  console.log(err);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// use this route for user registration and login
  //  http://localhost:3000/users/register ----- for registerring a user 
  //  http://localhost:3000/users/login ----- for logging in 

app.use('/users', userRouter);

// For creating a post a user must login so a token will be genertaed because only authenticated users can create post

  // http://localhost:3000/post/ --> url to post and get post of particular user (must use token in header        (Authorization) (token is generated after logging and will be in response body))

  // http://localhost:3000/post/:id   => url for update and delete post (id will be for particular post object id : _id)
app.use('/post', postRouter)

// use the below route for accessing all the posts with required longitude and latitude
app.use('/latitude', latLong)



