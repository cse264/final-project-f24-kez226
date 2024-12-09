# Final Project

## PopCorn Path
## Ivory Le (Frontend), Bernice Wong (Backend), Ken Zhu (Backend)

### With our amazing definitely not Netflix dupe application, you can find your popcorn filled path to great movies!

To install our project, start by cloning our code from the master branch. 

To connect to our database, use the following uri in a .env file in the backend folder
MONGODB_URI = mongodb+srv://kez226:JdA7rk4PQr4DIVQb@finalproject.w7qwd.mongodb.net/?retryWrites=true&w=majority&appName=FinalProject
Then run npm install in the backend folder

To connect the frontend, use the following API key in a .env file in the site folder
REACT_APP_TMDB_API_KEY=cefe3c4f5fc23deb5a31c524163edcce
Then run npm install in the site folder.

Lastly open two separate terminals. In the first, call node server.js in the backend folder. In the second, call npm start in the site folder.
### Now you are ready to hop on the PopCorn Path! 

To test user capabilities, navigate your way to our login screen and create a new user.
To test admin capabilities, use the login credentials person1@gmail.com and password person1.

### Requirements:
* Must have user accounts and different user roles: user/Admin
* Must use a database: MongoDB Atlas
* Must have interactive UI 
* Must use a library or framework not discussed/used in class: mongoose
* Must use an outside REST API in some way: https://developer.themoviedb.org/reference/intro/getting-started
