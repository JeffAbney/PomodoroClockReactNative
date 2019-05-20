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
  let userID = req.body.userID;
  let username = req.body.username

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("connection is working");
    collection.findOne({ userID: userID }, (error, doc) => {
      if (error) return next(error);
      if (doc == null) {
        console.log("No Such User, Creating new one");
        collection.insertOne({ userID: userID, username: username, log: [] }, (error, results) => {
          if (error) {
            return res.json({ "error": "something went wrong creating new user" });
          } else {
            console.log("New User Created");
            console.log(results);
            res.json({newUser: true, username: username, settings: null, userID: userID });
          }
        })
      } else {
        if (!doc.settings) {
          console.log("server didnt find any settings")
          res.json({ username: username, settings: null, userID: userID });
        } else {
          res.json({
            username: username,
            userID: userID,
            settings: {
              styles: doc.settings.styles,
              sessionValue: doc.settings.sessionValue,
              shortBreakValue: doc.settings.shortBreakValue,
              longBreakValue: doc.settings.longBreakValue,
            }
          });
        }
      }
    })
  })
})


//Handle add project

app.post('/newProject', (req, res) => {
  let userID = req.body.userID;
  let projectName = req.body.projectName;
  let date = req.body.date;
  let projectColor = req.body.projectColor;
  let projectKey = `projects.${projectName}`

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("connection is working, will try to add proejcts");
    console.log("userID", userID);
    collection.updateOne({ userID: userID },
      {

        $set: {
          [projectKey] : {
            creationDate: date,
            color: projectColor,
            log: []
          }
        }

      },
      (error, doc) => {
        if (error) return console.log(error);
        if (doc == null) {
          console.log("Can't find user to add project.")
          res.sendStatus(404);
        } else {
          console.log("Added project", doc);
          res.sendStatus(200);
        }
      }
    )
  })
})

//Handle Log activity

app.post('/log', (req, res) => {
  let userID = req.body.userID;
  let projectName = req.body.projectName;
  let taskName = req.body.taskName;
  let date = req.body.date;
  let taskTime = req.body.taskTime;

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("connection is working, will try to add task");
    collection.updateOne({ userID: userID },
      {
        $push: {
          projects: {
            [projectName]: {
              color: 'red',
              log: {
                projectName: projectName,
                taskName: taskName,
                taskTime: taskTime,
                date: date
              }
            }
          }
        }
      },
      (error, doc) => {
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

//Handle Get Actvitiy Log

app.post("/showLog", (req, res, next) => {
  let userID = req.body.userID;

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("connection is working");

    collection.findOne({ userID: userID }, (error, doc) => {
      console.log("Getting user data...");
      if (error) res.send(error);
      if (doc == null) {
        next("Can't find user");
      } else {
        console.log("Here's the data");
        res.json({ projects: doc.projects, userID: userID });
      }
    })
  })
})

// Handle Save User Settings
app.post('/saveSettings', (req, res) => {
  let userID = req.body.userID;
  let {
    switchValue,
    thumbColor,
    sessionValue,
    shortBreakValue,
    longBreakValue
  } = req.body.settings;

  console.log(req.body);
  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("Settings - connection is working");
    collection.updateOne({ userID: userID },
      {
        $set: {
          settings: {
            styles: !switchValue ? "lightStyles" : "darkStyles",
            thumbColor: thumbColor,
            sessionValue: sessionValue,
            shortBreakValue: shortBreakValue,
            longBreakValue: longBreakValue
          }
        }
      },
      (error, doc) => {
        if (error) return next(error);
        if (doc == null) {
          console.log("Can't find user to save settings.")
          res.sendStatus(404);
        } else {
          console.log("Found user to update settings");
          res.sendStatus(200);
        }
      })
  })
})

//Handle Loading of user settings on Log In
app.post("/getSettings", (req, res, next) => {
  let username = req.body.username;

  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) return process.exit(1);
    var db = client.db('Pomodoro');
    var collection = db.collection('Users');
    console.log("Get Settings - connection is working");

    collection.findOne({ username: username }, (error, doc) => {
      console.log("Getting user settings...");
      if (error) res.send(error);
      if (doc == null) {
        next("Can't find user");
      } else if (!doc.settings) {
        console.log("server didnt find any settings")
        res.json({ username: username, settings: null });
      } else {
        res.json({
          username: username,
          settings: {
            styles: doc.settings.styles,
            sessionValue: doc.settings.sessionValue,
            shortBreakValue: doc.settings.shortBreakValue,
            longBreakValue: doc.settings.longBreakValue,
          }
        });
      }
    })
  })
})

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});