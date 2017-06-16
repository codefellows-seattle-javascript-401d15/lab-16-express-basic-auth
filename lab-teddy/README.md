# Description:

### For this lab we created a back end sign up and sign in so that we can see how password hashing works and how you create a token for the user. We got to also work more with mongo server to see how it works and how it stores all the information needed for the lab to work.

# Installation of Needed Dependencies:

## Developer Dependencies:

chai: `npm i -D chai`
chai-http: `npm i -D chai-http`
coveralls: `npm i -D coveralls`
istanbul: `npm i -D istanbul`
mocha: `npm i -D mocha`
mocha-lcov-reporter: `npm i -D mocha-lcov-reporter`

### Dependencies:

bcrypt: `npm i -S bcrypt`
bluebird: `npm i -S bluebird`
body-parser: `npm i -S body-parser`
cors: `npm i -S cors`
crypto: `npm i -S crypto`
debug: `npm i -S debug`
dotenv: `npm i -S dotenv`
express: `npm i -S express`
http-errors: `npm i -S http-errors`
jsonwebtoken: `npm i -S jsonwebtoken`
mongoose: `npm i -S mongoose`
morgan: `npm i -S morgan`

# Description on how to run:

### first start server by useing `nodemon server.js`. To do this though you need to be in the directory that has the server in it. Then I would open 3 more terminal shells to then run mongoedb. To run mongoose you type `mongod —dbpath ./db` and you should already have a db directory that is git ignored. The commands to POST and GET are: `http POST :3030/api/signup username='whatever you want' email='whatever you want' password='whatever you want'`; you should then get a 200 code say that it was okay and worked. To GET you do: `http -a username:password api/signin`. This should give you a 200 code and work. 
