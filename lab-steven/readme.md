# Lab 16 - cfgram API - Basic Authentication
This is a lab assignment in CF401 where we create an API that is used for creating users.

### Setup
- Clone this repo
- Run ```npm install``` in your terminal (make sure you're at the lab-steven filepath in the repo)
- Setup environment variables in a .env file for your PORT, MONGOD_URI, APP_SECRET

### Methods and Routes
##### User
- ```POST /api/signup```        : requires *username*, *email*, and *password*. Returns Token.
- ```GET /api/signin```         : requires {<username>:<password>}. Returns Token.

### Scripts
- ```npm run lint```            : lints the code
- ```npm test```                : runs tests
- ```npm run debug```           : runs nodemon server with debug active
- ```npm start```               : runs server
