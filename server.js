var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

/************
 * DATABASE *
 ************/

var todos = [
  { _id: 1, task: "Laundry", description: "Wash clothes" },
  { _id: 2, task: "Grocery Shopping", description: "Buy dinner for this week" },
  { _id: 3, task: "Homework", description: "Make this app super awesome!" },
];

app.get("/", function homepage(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/todos/search", function search(req, res) {});

app.get("/api/todos", function index(req, res) {
  res.json({ todos: todos });
});

app.post("/api/todos", function create(req, res) {
  var newItem = req.body;

  if (todos.length > 0) {
    newItem._id = todos[todos.length - 1]._id + 1;
  } else {
    newItem._id = 1;
  }

  todos.push(newItem);

  res.json(newItem);
});

app.get("/api/todos/:id", function show(req, res) {
  res.json(todos[req.params.id - 1]);
});

app.put("/api/todos/:id", function update(req, res) {
  let todoId = Number(req.params.id);

  if (!req.body.task || !req.body.description) {
    res.send("task");
  } else {
    req.body._id = todoId;

    let theTodo = todos.find(function (todos) {
      return todos._id === Number(req.params.id);
    });

    theTodo.task = req.body.task;
    theTodo.description = req.body.description;
    res.json(theTodo);
  }
});

app.delete("/api/todos/:id", function destroy(req, res) {
  res.json(todos[req.params.id - 1]);
  todos.splice([req.params.id - 1], 1);
});

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
