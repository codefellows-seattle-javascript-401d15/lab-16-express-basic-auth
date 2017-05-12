# lab 16 basic auth
----
## Goal
Create a user model, a POST and a GET route to interact with it, and some tests.

## Setup

 - **make sure you have Node.js and MongoDB installed.**
```$ apt-get node```
```$ npm install mongoose```

 - **install the app**
```$ npm install ```

 - **start the server**
```$ npm run start```

 - **start the database**
```$ mongo```
```$ mongod --dbpath ./db```
```$ use cfgram-dev```


## Usage
You can sign up and sign in with the following end points:
note: this is based on using 'HTTPie'
- Sign up:
    - http POST
        - http POST :3000/api/signup username=<UniqueUsername> password=<password> email=<UniqueEmail>
- Sign in:
    - http GET
        - http :3000/api/signin -a<username>:<password>

- Test!
   - npm run test
   (mocha)

## Expected

##### EXAMPLE RESPONSES:
- POST:
```
      HTTP/1.1 200 OK
  Access-Control-Allow-Origin: *
  Connection: keep-alive
  Content-Length: 207
  Content-Type: application/json; charset=utf-8
  Date: <date> GMT
  ETag: W/"<etag>"
  X-Powered-By: Express

  "<you will receive a unique token string here>"
```

- GET:
```
      HTTP/1.1 200 OK
  Access-Control-Allow-Origin: *
  Connection: keep-alive
  Content-Length: 207
  Content-Type: application/json; charset=utf-8
  Date: <date> GMT
  ETag: W/"<etag>"
  X-Powered-By: Express

  "<you will receive a unique token string here>"
```

### Attributions
I worked closely with Abigail White, Ali Grampa, David Teddy and Steven Johnson.
JR Iriarte really helped me get through making my POST route work.  
