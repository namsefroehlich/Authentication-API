# Authentication Node.js API

Node.js api that handles Authentication.

- Authentication method using jwt. jwt to check for private routes.
- Mongodb as database and mongoose to create models
- Express Server
- bcryptjs to hash passwords

======================================================================

# Commands:
- npm-install-all /for packages and dependecies.
- npm start / to start server.
- Mongo DB Cluster Is online 

======================================================================

# Postman:

- Register: http://localhost:3000/api/user/register
!raw Json Body Post req.
{
    "name": "adminadmin",
    "email": "admin@gmail.com",
    "password": "adminadmin"
}


- Login: 
http://localhost:3000/api/user/login
raw Json Body Post req.
{
    "email": "admin@gmail.com",
    "password": "adminadmin"
}


- Private Route Only Accesible with JWT Token:
http://localhost:3000/api/private
Headers: auth-token = token(from login response)
