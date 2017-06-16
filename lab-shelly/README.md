![cf](https://i.imgur.com/7v5ASc8.png) lab 16 express basic authorization
======

# Overview
* Created a HTTP Server using `express` with basic authentication middleware for parsing basic auth headers.
* A User Model was created using Mongoose with properties `username`, `password`, and `email` (data stored in MongoDB)
* The user password has a unique `findHash` property that is generated with bcrypt.
* A token is returned to users upon successful POST and GET request

# Setup
* Clone this repo and navigate to the lab-shelly directory
* Install the dependencies
* Run nodemon server in terminal
* Use server endpoints for requests

## Server Endpoints
### `/api/signup`
* `POST` request (using httpie)
```
HTTP POST :3000/api/signup username='<username>' password='<password>' email='<email>'
```
 * the client should pass the username and password in the body of the request
 * the server should respond with a token generated using jsonwebtoken and the users findHash
 * the server should respond with a 400 Bad Request to failed request

### `/api/signin`
* `GET` request (localhost:3000, using httpie)
```
HTTP -a <username>:<password> :3000/api/signin
```
 * the client should pass the username and password to the server using a _Basic_ auth header
 * the server should respond with a token to authenticated users
 * the server should respond with a 401 Unauthorized to non authenticated users
