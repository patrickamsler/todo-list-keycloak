const express = require('express');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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
  
  // get all lists
  app.get('/api/v1/lists', (req, res) => {
    dbo.collection("todoList")
        .find({
          userId: req.user.sub
        })
        .toArray()
        .then(results => res.send(results))
  });
  
  // create new list
  app.post('/api/v1/lists', (req, res) => {
    dbo.collection("todoList")
        .insertOne({
          userId: req.user.sub,
          title: req.body.title,
          todos: []
        })
        .then(result => res.send(result.ops[0]))
  });
  
  // add todo
  app.put('/api/v1/lists/:listId/todo', (req, res) => {
    const listQuery = {
      _id: ObjectID(req.params.listId),
      userId: req.user.sub,
    };
    const newTodo = {
      $push: {
        todos: {
          _id: new ObjectID(),
          title: req.body.title,
          done: false,
          description: req.body.description
        }
      }
    };
    dbo.collection("todoList")
        .updateOne(listQuery, newTodo)
        .then(() => res.sendStatus(204))
  });
  
  // update todo
  app.put('/api/v1/lists/:listId/todo/:todoId', (req, res) => {
    const query = {
      _id: ObjectID(req.params.listId),
      userId: req.user.sub,
      "todos._id": ObjectID(req.params.todoId)
    };
    const update = {
      $set: {
        "todos.$.title": req.body.title,
        "todos.$.done": req.body.done,
        "todos.$.description": req.body.description
      }
    };
    dbo.collection("todoList")
        .updateOne(query, update)
        .then(() => res.sendStatus(204))
  });
  
});

const port = process.env.NODE_PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
