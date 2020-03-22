const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// STEP 1: Create connection to local database
// let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todos";
let MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://user2:password1@ds249757.mlab.com:49757/heroku_sqsv2cnj";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDb connected!"))
  .catch(err => console.log("There was an error", err));

// STEP 2: Create schema
const todoschema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
});

// STEP 3: Create model
const Todo = mongoose.model("Todo", todoschema);

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res) {
  // fetch database and send ejs markup to client
  Todo.find({})
    .then(response => {
      console.log("Fetching db");
      res.render("index.ejs", { todos: response });
    })
    .catch(err => console.log("Error"));
});

app.post("/todo", function(req, res) {
  Todo.create({
    name: req.body.todo
  })
    .then(todo => {
      res.redirect("/");
    })
    .catch(err => res.send(err));
});

app.delete("/deleteAll", function(req, res) {
  // mongoose.connection.db.dropCollection('todos', function(err, result) {...});
  console.log("/deleteAll");
  res.end();

  // DELETE COLLECTION
  //   Todo.collection
  //     .drop()
  //     .then(response => {
  //       console.log("Response", response);
  //       res.redirect("/");
  //     })
  //     .catch(err => console.log(err));

  // DELETE BY ID
  //   Todo.findById({ _id: "5e77b328e5a389126ab4ae91" })
  //     .then(dbModel => {
  //       dbModel.remove();
  //       res.json(dbModel);
  //     })
  //     .catch(err => res.status(422).json(err));

  //   Todo.deleteMany({})
  //     .then(response => {
  //       console.log("Deleted db contents", response);
  //       res.redirect("/");
  //     })
  //     .catch(err => console.log("Error"));
});

app.listen(8080, function(req, res) {
  console.log("Server running on port 8080");
});
