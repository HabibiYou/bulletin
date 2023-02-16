# Actual steps to run this

## PRE-REQ install all node_modules

you will need to install all the node modules. 

Do this by running `npm install` and it install them all.

be sure to be in the correct dir.


Next, We will need multiple terminals to run it. so create 

## terminal 1: Create the fake server

For now it is all wired up to http://localhost:8000/

This means you should point the server to this domain.

Run the following on a terminal, make sure you are in the bulletin directory

`npx json-server --watch fake_server\fake.json --port 8000`

This creates the *fake server* 


## terminal 2

To start our app, in a seperate terminal run: 

`npm start`

be sure to be in the correct dir, so within /bulletin

be sure to have a third terminal to just have as you develop so you don't need to shut off the server or react app.

## begin to see the work

Now all of this is @ http://localhost:3000/
