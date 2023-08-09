
# Node.js JWT Authentication and CRUD API

This is a Node.js project that demonstrates user registration, login with JWT and Passport authentication, and CRUD operations for posts. 
Users can register, log in to get a JWT token, and use that token to access protected CRUD endpoints for managing posts.

#cd src
   npm install

#usage 
start server 
use nodemon index.js
The server will be running at http://localhost:3000.

Use a tool like Postman  to test the following endpoints:

User Registration
    POST /users/register
Create a new user account.
User Login
      POST /users/login
Authenticate and get a JWT token.
Protected CRUD Endpoints


#You need to include the JWT token in the Authorization header for the following endpoints.

GET /post
Get a list of all posts of particular user.


POST /post
Create a new post.

PUT /post/:id
Update an existing post.

DELETE /post/:id
Delete a post.

#To retrieve posts using latitude and longitude.
GET /latitude
Also provide latitude and longitude in request body


#Authentication
Authentication is done using JWT (JSON Web Tokens) and Passport middleware. Users need to authenticate to obtain a token,
which is then included in the Authorization header for accessing protected endpoints.
