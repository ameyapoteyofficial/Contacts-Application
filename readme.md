Please have the following installed on your device before starting:

1. psql shell
2. VS Code
3. npm tools

These are the instructions for mac OS. Others should be similar.

DB Creation:


open your terminal and go to the folder where db.sql is present
and type the following command:

```psql -U postgres```

this will open the appropriate role in psql (you need to create the database in the postgres role to run the app)

Now, type the following command to create the database:

```create database contactlist;```

Now open the database using the command :

```\c contactlist```

Now create the appropriate tables using the db.sql script, make sure the file is in the same folder you fired up psql from.

```\i db.sql```











Application setup:



Now, I would recommend you to do the following in VS COde. But, you could do from terminal as well.

Open the DB Project folder in VS Code and open up a terminal

Now, navigate to server folder and type the following command to install the node modules (you need to have npm tools installed for this):

```npm install``` 

Now, go the credentials.js file in the server folder and enter your password for the postgres user. You do not need to change anything else here.

Now type the following commands in the given order (please wait for each command to complete, shouldnt take that long!) to import the csv data and start the server:

```node importContactTable.js```
```node importOtherTables.js```
```nodemon index``` or ```node index```


Now, Open up a new termnial and go to the client folder within the project and type the following commands to install the node modules(ignore any error messages if they pop up while installing node modules, the process should complete without any issues)and start the client:

```npm install```
```npm start```

Now, you are good to go! Just give it a second and the server should be up. Now, navigate to http://localhost:3000 in your favorite browser. Also, kindly give second when you load a page for all the components to complete rendering, for eg. the buttons might take a second to start working on page load.

Please feel free to reach me at ameya.potey@utdallas.edu, should you face any hiccups. Good day!