## Lab 16: Express Basic Auth

## About This Project

* Build an HTTP server using the Express Node module.
* Create a User model to represent DogGram users.
* Create a controller to manage GET and POST requests to respective routes.
* Store User records in Mongo DB.
* Implement basic authentication to ensure users only have access to their own accounts.

## Using This Project

* Assuming MongoDB installed:
  * Fork and clone this repository.
  * Navigate to lab16-kaylee directory.
  * Install necessary NPM packages (see dependencies below).
  * Create a new DB in Mongo by making a POST request to the /api/signup route (see example requests below). The new DB should show up as "doggramDB".
  * Add and retrieve User records by making GET and POST requests to different respective routes (again, see below).

## Project Dependencies

* npm install -S bcrypt
* npm install -S bluebird
* npm install -S body-parser
* npm install -S cors
* npm install -S coveralls
* npm install -S crypto
* npm install -S debug
* npm install -S dotenv
* npm install -S eslint
* npm install -S express
* npm install -S http-errors
* npm install -S istanbul
* npm install -S jsonwebtoken
* npm install -S mocha-lcov-reporter
* npm install -S mongoose
* npm install -S morgan

## Developer Dependencies

* npm install -D mocha
* npm install -D chai
* npm install -D chai-http

## Making HTTP Requests

* Example POST request
  * In terminal (assuming httPie installed): http post :3000/api/signup username=kaymay1000 password=secret email=kay@kay.com
  * Expected output: a user token
  * Expected status code: 200
  * Should populate Mongo DB with new User record

* Example GET request
  * In terminal (assuming httPie installed): http :3000/api/signin -a <username>:<password>
  * Expected output: a user token
  * Expected status code: 200

## Biggest Roadblocks

* Testing for a 200 status code to /api/signup route! (Still isn't passing as is...)
