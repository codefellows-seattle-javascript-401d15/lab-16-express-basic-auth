![cf](https://i.imgur.com/7v5ASc8.png) Basic Auth Practice w/ Express!
======

# To Signup
* `HTTP POST :3000/api/signup name=<username> email=<email@domain> password=<password>`

## Server Endpoints
### `/api/signup`
* `POST` request
 * the client should pass the username, email and password in the body of the request
  * example: `http POST :3000/api/signup username=cameron email=cameron@bacon.yum password=bacon`
 * the server should respond with a token generated using jsonwebtoken and the users findHash
 * the server should respond with a 400 Bad Request on an improper request

### `/api/signin`
* `GET` request
 * the client should pass the username and password to the server using a _Basic_ auth header
  * example: `http :3000/api/signin -a cameron:bacon`
 * the server should respond with a token to authenticated users
 * the server should respond with a 401 Unauthorized to non authenticated users
