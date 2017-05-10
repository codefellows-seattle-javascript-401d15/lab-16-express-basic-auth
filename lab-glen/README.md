#Welcome to Shirtless gym selfie gram! Where you can post shirtless gym pics!

#To create an account follow these Directions
* Run nodemon server.js

* To signup type into the command line ```http POST :3000/api/signup username=<your desired username> password=<your pass> email=<your email>```

* To login type into the command line ```http GET :3000/api/signin -a username:password```

* After you create a user you can create your own gallery

* To create a gallery, type ```http POST :3000/api/gallery name=whatever name desc=whatever description 'Authorization:Bearer <token from username>'```

* To get gallery information type ```http GET :3000/api/gallery/<id from username> 'Authorization:Bearer <token from username>'```

* To update gallery info, type ```http PUT :3000/api/gallery/<id from username> 'Authorization:Bearer <token from username>'```

* To delete a gallery type ```http DELETE :3000/api/gallery/<id from username> 'Authorization:Bearer <token from username>'```

# Test directions
* STOP the server, and type ```npm run test```
