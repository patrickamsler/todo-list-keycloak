const express = require('express');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const TodoRepository = require('./TodoRepository');

const mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`;
console.log(mongoUrl);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI
  }),
  
  // Validate the audience and the issuer.
  audience: `account`,
  issuer: process.env.TOKEN_ISSUER,
  algorithms: ['RS256']
});

app.use(checkJwt); //the decoded token is attached to req.user

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    throw err;
  }
  const dbo = db.db("todo");
  const todoRepo = new TodoRepository(dbo);
  
  // get all lists
  app.get('/api/v1/lists', async (req, res) => {
    const lists = await todoRepo.getLists(req.user.sub);
    res.send(lists);
  });
  
  // create new list
  app.post('/api/v1/lists', async (req, res) => {
    const createdList = await todoRepo.insertList(req.user.sub, req.body.title);
    res.send(createdList);
  });
  
  // add todo
  app.post('/api/v1/lists/:listId/todos', async (req, res) => {
    const userId = req.user.sub;
    const listId = req.params.listId;
    const todoId = await todoRepo.insertTodo(userId, listId, req.body);
    const list = await todoRepo.getList(userId, listId);
    const newTodo = list.todos.filter(todo => todo._id.toString() === todoId)[0];
    res.send(newTodo);
  });
  
  // update todo
  app.put('/api/v1/lists/:listId/todos/:todoId', async (req, res) => {
    const userId = req.user.sub;
    const listId = req.params.listId;
    const todoId = req.params.todoId;
    await todoRepo.updateTodo(userId, listId, todoId, req.body);
    const list = await todoRepo.getList(userId, listId);
    const updatedTodo = list.todos.filter(todo => todo._id.toString() === todoId)[0];
    res.send(updatedTodo);
  });
  
});

const port = process.env.NODE_PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
