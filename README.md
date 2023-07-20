# So Yummy Backend

The backend was created for the So Yummy application, in which after a short registration you can find more than a hundred delicious recipes and add them to your favorites so as not to lose, you can also save your personal recipe in the database, there is also a convenient shopping list of ingredients. The server part is built on the following technologies: Node.js, Express, Mongoose. Database - MongoDB. We use Cloudinary for cloud storage of images. The documentation is written in Swagger.

========================= To run the backend you need:==========================

Go to the MongoDB site and create a classter there. After creating a user. The default login is admin, and specify the password yourself. Back up your IP address by clicking on the button below. Click the Browse Collections button and click Create Database. Then click the "Connect" button and then click "Connect App". Copy the link. Create a file ".env" in the root of the project and insert a link to connect to the database using the key "DB_HOST=", it will look like this "DB_HOST=mongodb+srv://User:@cluster0.1spufqi .mongodb.net/?retryWrites= true&w=majority" Change the login and password to those specified during registration and add the name of our database "exampel". The link should look like this: "DB_HOST=mongodb+srv://User: QWE123QWE123QWE1@cluster0.1spufqi.mongodb.net/exampel?retryWrites=true&w=majority".

Open a terminal in the root folder of the server. You can also go there with the "cd server" command. Enter the command "npm i". After downloading the data, enter the command "npm start". The console should show "Server OK" and "Connection to database successful"

You can see the work of the project here - https://nezalonov-serhii.github.io/so-yummy-frontend

Swagger documentation: https://so-yummy-426w.onrender.com/api/api-docs

Link to the interface https://github.com/nezalonov-serhii/so-yummy-frontend
