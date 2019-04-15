var express = require('express');
var bodyParser = require('body-parser');

// Initialize http server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://JeffAbney:warhol88@cluster0-schfu.mongodb.net/test?retryWrites=true";

// Handle Sign In
app.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("connection is working");
    collection.findOne({ username: username, password: password }, (error, doc) => {
      if (error) return next(error);
      if (doc == null) {
        console.log("No Such User")
        res.sendStatus(403)
      } else {
        res.sendStatus(200)
      }
    })
  })
})

//Handle Create User
app.post('/createUser', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("connection is working");
    collection.findOne({ username: username }, (error, doc) => {
      if (error) return next(error);
      if (doc == null) {
        collection.insert({ username: username, password: password, log: [] }, (error, results) => {
          if (error) return res.json({ "error": "something went wrong" });
          console.log("New User Created");
          console.log(results);
          res.sendStatus(200);
        })
      } else {
        console.log("Username taken")
        res.sendStatus(403)
      }
    })
  })
})

//Handle Log activity

app.post('/log', (req, res) => {
  let username = req.body.username;
  let activityCategory = req.body.activityCategory;
  let activityName = req.body.activityName;
  let date = req.body.date;
  let activityTime = req.body.activityTime;

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("connection is working");
    collection.updateOne({ username: username },
       {$push: { log: {activityCategory: activityCategory, activityName: activityName, activityTime: activityTime, date: date} }}, (error, doc) => {
      if (error) return next(error);
      if (doc == null) {
        console.log("Can't find user to log.")
        res.sendStatus(404);
      } else {
        console.log("Found user to update");
        res.sendStatus(200);
      }
    })
  })
})
// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});