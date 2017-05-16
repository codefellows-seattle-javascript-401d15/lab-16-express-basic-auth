## Basic Auth Lab

This lab uses a Mongo database to allow a user to sign up with a password and email address, then sign back in using the same credentials.

In the command line, the following command can be used to create a new user through the POST method:

`http POST :3000/api/signup username=<username> email=<email> password=<password>`

The GET method can be used to retrieve the user's entry in Mongo using the following command: 

`http GET :3000/api/signin -a <username>:<password>`

This lab uses the following dependencies:
* Dependencies: bcrypt, bluebird, body-parser, cors, crypto, debug, dotenv, express, http-errors, jsonwebtoken, mongoose, and morgan
* Install with the command line prompt of `npm install -S ` then the names of these dependencies separated by a space
* Developer Dependencies: chai, chai-http, coveralls, istanbul, mocha, mocha-lcov-reporter
* Install with the command line prompt of `npm install -D ` then the names of these developer dependencies separated by a space

