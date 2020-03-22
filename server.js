const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

let todos = ["init"];

// STEP 1: Create connection to local database
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todos";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDb connected!"))
  .catch(err => console.log(err));

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

app.get("/", function(req, res) {
  //   console.log("Hello from home page");
  res.render("index.ejs", { todos: todos });
});

app.get("/api", function(req, res) {
  res.send("Hi from /api");
});

app.post("/todo", function(req, res) {
  Todo.create({
    name: req.body.todo
  })
    .then(todo => {
      console.log("Successfully added ", todo);
      res.send("success");
    })
    .catch(err => res.send(err));

  //   todos.push(todo);
  //   res.render("index.ejs", { todos: todos });
});

app.listen(8080, function(req, res) {
  console.log("Server running on port 8080");
});
