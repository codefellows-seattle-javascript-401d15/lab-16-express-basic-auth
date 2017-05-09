![cf](https://i.imgur.com/7v5ASc8.png) lab 16 express basic authorization
======

# To Signup
* `HTTP POST :3000/api/signup name=<username> email=<email@domain> password=<password>`

# Directions
* Create these directories to organize your code:
 * db - use the command `mongod --dbpath ./db` to start mongod using this directory
 * lib
 * model
 * route
 * test
* Create a HTTP Server using `express`
* Use the `http-errors` npm  module with the new`error-response` middleware from lecture
* Create a **User Model** using mongoose with the properties `username`, `password`, and `findHash`
 * The user must have a unique username and findhash
 * the user must have an email
 * The user must never store the password as plain text (hash the password)
 * The user must have a method for generating a token from the findHash
* Create a Basic Auth Middleware for parsing basic auth headers
* use the `body-parser` express middleware to on `POST` and `PUT` routes
* use the npm `debug` module to log the functions being executed in your app
* using the express `Router` create an auth router with routes for **signup** and **signin**
* Your server should depend on the environment variables
 * `DEBUG` - for turning on logging
 * `APP_SECRET` - for signing and verify tokens
 * `PORT` - for setting the port your server will listen on
 * `MONGODB_URI` - for setting the URI that mongoose will connect to

## Server Endpoints
### `/api/signup`
* `POST` request
 * the client should pass the username and password in the body of the request
 * the server should respond with a token generated using jsonwebtoken and the users findHash
 * the server should respond with a 400 Bad Request to failed request

### `/api/signin`
* `GET` request
 * the client should pass the username and password to the server using a _Basic_ auth header
 * the server should respond with a token to authenticated users
 * the server should respond with a 401 Unauthorized to non authenticated users

## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* `/api/signup`
 * `POST` - test 400, responds with the `http-errors` 401 name, for if no `body provided` or `invalid body`
 * `POST` - test 200, response body like `<token>` for a post request with a valid body
* `/api/signin`
 * `GET` - test 401, responds with the `http-errors` 401 name, if the users could not be authenticated
 * `GET` - test 200, response body like `<token>` for a request with a valid basic auth header
