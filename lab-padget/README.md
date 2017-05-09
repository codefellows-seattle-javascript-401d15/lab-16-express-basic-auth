# Lab 16: Express Basic Authorization

## Description
For this lab we sent a username and password to the server using a Basic auth header.

* For more information see: [class 16](https://github.com/codefellows/seattle-javascript-401d15/tree/master/class-16-express-basic-auth) and [lab 16](https://github.com/codefellows-seattle-javascript-401d15/lab-16-express-basic-auth).

## Version
* 0.1.0

## Installation
Please visit the following pages for how to install your project locally.

* [Cloning A Repository](https://help.github.com/articles/cloning-a-repository/)
* [Fork A Repo](https://help.github.com/articles/fork-a-repo/)
* [Forking](https://guides.github.com/activities/forking/)

### NPM Packages
* [NPM Docs](https://docs.npmjs.com)
* [NPM package.json](https://docs.npmjs.com/files/package.json)

### JSON Configuration
Initializing package.json
```npm install
npm init
npm install -D mocha chai
```

```scripts
"scripts": {
    "test": "mocha",
    "start": "node server.js",
    "debug": "DEBUG=cfgram* nodemon server.js",
    "cover": "istanbul cover _mocha",
    "coveralls": "npm run cover -- --report lcovonly && cat ./coverage/lcov.info | coveralls"
  }
```

### Dependencies
The result of installation above.

```npm result
"dependencies": {
    "bcrypt": "^1.0.2",
    "bluebird": "^3.5.0",
    "body-parser": "^1.17.1",
    "cors": "^2.8.3",
    "crypto": "0.0.3",
    "debug": "^2.6.6",
    "dotenv": "^4.0.0",
    "express": "^4.15.2",
    "http-errors": "^1.6.1",
    "jsonwebtoken": "^7.4.0",
    "mongoose": "^4.9.8",
    "morgan": "^1.8.1"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "chai-http": "^3.0.0",
    "coveralls": "^2.13.1",
    "istanbul": "^0.4.5",
    "mocha": "^3.3.0",
    "mocha-lcov-reporter": "^1.3.0"
  }
```
* `node index.js`

## Running Tests
In [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (Terminal) enter the command:

```testing
npm run test
```

## Resources

* [Node Assert](https://nodejs.org/api/assert.html)
* [Chai Expect](http://chaijs.com/api/bdd/)
* [Chai Assertion Styles](http://chaijs.com/guide/styles/#expect)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/mmpadget/lab-16-express-basic-auth/blob/lab-16/lab-padget/LICENSE) file for details.

## Acknowledgments
* Code Fellows
* Scott Schmidt, Instructor.
* Thomas Martinez, Teaching Assistant.
* JR Iriarte, Teaching Assistant.
