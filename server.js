var express = require('express');
var bodyParser = require('body-parser');

// Initialize http server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Handle / route
app.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username === "admin" && password === "admin") {
    console.log("Correct USER")
    res.sendStatus(200);
  } else {
    console.log("Bad User")
    res.sendStatus(403);
  }
}
)

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});