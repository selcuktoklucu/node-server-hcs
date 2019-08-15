# Simple Node Server with Babel

This repo created from this repository
https://github.com/rwieruch/node-babel-server

## Features

* Babel 7
* Environment Variables

## Requirements

* [node & npm](https://nodejs.org/en/)
* MongoDB

# Development process and strategy

The scope of this project is hosting a backend server by using ExpressJs in NodeJs environment and responding client's HTTP requests.
Project created from scratch, by following some instructions.
Some modules that I have used in this project to create this repository:
express-generator - express generator
nodemon - realtime server update
passport -user authentication
bcrypt - encryption library for session management
babelcore - bring ecmascript standard to this Project
babel rc
dotenv - to use environment variables
uuid - middleware to generate unique id's for resource ids,
Mongoose-babel server - Use the Non-relational database like Relational database
passport-http-bearer - middleware for passport library
passport-stratagy

## Installation

Clone this repository
Install dependencies with npm install
start your MongoDB Server
include your .env file like:
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/node-express-mongodb-server
```
start your server with npm start
