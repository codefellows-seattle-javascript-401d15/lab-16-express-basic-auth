# Lab-16
# Patrick Sheridan

## Overview 
The point of this lab was to create a mongo database where a user could sign up and sign in.

## To Use
With a mongod running, enter the following commands into a new terminal.

### User signup/POST
```
http POST :3000/api/signup username=<username> email=<email> password=<password>
```
### User signin/GET
```
http GET :3000/api/signin -a <username>:<password>
```
