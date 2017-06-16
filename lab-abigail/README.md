![cf](https://i.imgur.com/7v5ASc8.png) Lab 16 User Authorization
======

# About
This program allows users to store information regarding their `username`, `email`, and `password` using a Mongo Database. The program utilizes REST principles to POST and GET to create and retrieve entries, given custom user input. This program runs in the user's terminal on `localhost:3000`.

# Directions for Modifying Database
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `nodemon server`.
3. In a separate terminal tab, enter entries:

  * To run POST or SIGNUP, type into command line:
`http POST :3000/api/signup username=<username> email=<email> password=<password>`
    * Example: `http POST :3000/api/signup username=abswhite email=abs@white.com password=1234`

  * To run GET or SIGNIN, type into command line: `http GET :3000/api/signin -a <username>:<password>`
    * Example: `http GET :3000/api/signin -a abswhite:1234`

* Improper requests will render a 'Bad Request' 400 status, or 404 status.

# Directions for Accessing Database
1. Open Mongo Shell by entering `mongod --dbpath ./db` in the local machine terminal.
  * Verify shell by receiving localhost assignment in terminal window.
2. In a separate terminal tab, access Mongo environment by entering `mongo`.
2. After creating a db entry (see steps above), you can view the database by entering `show dbs`.
3. After verifying database creation in Step 2, you can enter the database environment by entering `use <database name>`.
4. To view database contents, enter `db.users.find()` in tab.
5. To delete database contents, enter `db.users.drop()`.
