#About
Small Node.js App for Codefellows Coding Bootcamp.

Sign up to account that doesn't do anything. Using Mongo.

##Installation:

1. clone this repository and ``cd`` into it
2. run ``npm i``

## To Use:
1. Start the server using ``npm start`` in one terminal
2. In another, you'll need to spin up the mongo database server
  ⋅⋅⋅ * Ensure there is a directory named 'db' in your cloned repository
  ⋅⋅⋅ * In your terminal, enter ``mongod --dbpath ./db``
  ⋅⋅⋅ ⋅⋅⋅ Should you come into the 'address in use' error, ``sudo killall mongod`` should do it.
3. 2. In yet another terminal, use [HTTPie][https://httpie.org/] to perform the following CRUD operations:
⋅⋅⋅ POST: ``http POST localhost:3000/user  username='Dude' password='Seekret' emailAddress='me@mail.com'``
⋅⋅⋅ GET: ``http POST localhost:3000/user -a 'Dude':'Seekret'``
