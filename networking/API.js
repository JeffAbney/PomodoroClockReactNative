const express = require('express');
const app = express();
import mongoose from 'mongoose';
const MongoClient = require('mongodb').MongoClient;
import User from './models/user';
const bodyParser = require('body-parser');

// Connect to MongoDB
const uri = "mongodb+srv://JeffAbney:warhol88@cluster0-schfu.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  if (error) return process.exit(1);
  var db = client.db('Pomodoro');
  var collection = db.collection('Users');
  console.log("connection is working");

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/newUser", (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    collection.findOne({ username: username }, (error, doc) => {
        if (error) next(error);
        if (doc != null) next("User already exists: " + doc.username);
        else {
          collection.insert({ username: username, password: password }, (error, results) => {
            if (error) return res.json({ "error": "Could not add user" })
            console.log("New user: " + results.ops[0].username);
            return res.json({ username: results.ops[0].username, _id: results.ops[0]._id });
          })
        }
      })
  })
})