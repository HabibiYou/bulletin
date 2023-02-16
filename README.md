# Actual steps to run this


We will need multiple terminals to run it.

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

## begin to see the work

Now all of this is @ http://localhost:3000/
