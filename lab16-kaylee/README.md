## Lab 16: Double Resource Express/MongoDB API

## About This Project

* Build an HTTP server using the Express Node module.
* Create two models (Dog and Toy) with a one-to-many relationship, used to produce instances of resources.
* Create two controller to manage GET, POST, PUT and DELETE requests to specific routes.
* Store Dog records (and corresponding Toy records) in Mongo DB.

## Using This Project

* Assuming MongoDB installed:
  * Fork and clone this repository.
  * Navigate to lab14-kaylee directory.
  * Install necessary NPM packages (see dependencies below).
  * Create a new DB in Mongo by making a POST request to the Dog post route (see example requests below). The new DB should show up as "dogToysDB".
  * Manipulate Dog and Toy records by making GET, POST, PUT and DELETE requests to different routes (again, see below).

## Project Dependencies

* npm install -S bluebird
* npm install -S body-parser
* npm install -S chai
* npm install -S chai-http
* npm install -S eslint
* npm install -S express
* npm install -S mongoose
* npm install -S morgan

## Developer Dependencies

* npm install -D mocha

## Making HTTP Requests

### Dog Requests

* Example GET request (single Dog)
  * In terminal (assuming httPie installed): http get :3000/api/dog/someID
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "breed": "requestedBreed",
      "name": "requestedName"
    }
  * Expected status code: 200

* Example POST request
  * In terminal (assuming httPie installed): http post :3000/api/dog name="Joe Joe" breed="bichon frise"
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "breed": "bichon frise",
      "name": "Joe Joe"
    }
  * Expected status code: 200
  * Should populate Mongo DB with new Dog record

* Example PUT request
  * In terminal (assuming httPie installed): http put :3000/api/dog/someID name="newName" breed="newBreed"
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "breed": "newBreed",
      "name": "newName"
    }
  * Expected status code: 200
  * Should update existing Dog record (as specified by ID) in Mongo DB with new name and breed properties

* Example DELETE request
  * In terminal (assuming httPie installed): http delete :3000/api/dog/someID
  * Expected output:
  {
    "__v": 0,
    "_id": "someID",
    "breed": "deletedBreed",
    "name": "deletedName"
  }

  * Expected status code: 200
  * Should delete Dog record (as specified by ID) from Mongo DB

### Toy Requests

* Example GET request (single Toy)
  * In terminal (assuming httPie installed): http get :3000/api/toy/someToyID
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "type": "requestedType",
      "color": "requestedColor"
    }
  * Expected status code: 200

* Example POST request
  * In terminal (assuming httPie installed): http post :3000/api/dog name="Joe Joe  "type="bichon frise"
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "type": "bichon frise",
      "name": "Joe Joe"
    }
  * Expected status code: 200
  * Should populate Mongo DB with new Dog record

* Example PUT request
  * In terminal (assuming httPie installed): http put :3000/api/dog/someID name="newName"  type="newBreed"
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "type": "newBreed",
      "name": "newName"
    }
  * Expected status code: 200
  * Should update existing Dog record (as specified by ID) in Mongo DB with new name an type properties

* Example DELETE request
  * In terminal (assuming httPie installed): http delete :3000/api/dog/someID
  * Expected output:
  {
    "__v": 0,
    "_id": "someID",
    "type": "deletedBreed",
    "name": "deletedName"
  }

  * Expected status code: 200
  * Should delete Dog record (as specified by ID) from Mongo DB

## Biggest Roadblocks

* Integration tests-- figuring out how to refactor tests from previous lab to accommodate for MongoDB's "_id" property (vs. uuid's plain "id" property).
