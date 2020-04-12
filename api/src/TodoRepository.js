const ObjectID = require('mongodb').ObjectID;

class TodoRepository {
  
  constructor(dbo) {
    this._dbo = dbo;
  }
  
  getLists(userId) {
    return this._dbo.collection("todoList")
        .find({
          userId: userId
        })
        .toArray()
  }
  
  getList(userId, listId) {
    return this._dbo.collection("todoList")
        .findOne({
          _id: ObjectID(listId),
          userId: userId
        })
  }
  
  insertList(userId, title) {
    return this._dbo.collection("todoList")
        .insertOne({
          userId: userId,
          title: title,
          todos: []
        })
        .then(result => result.ops[0]);
  }
  
  insertTodo(userId, listId, body) {
    const todoId = new ObjectID();
    const listQuery = {
      _id: ObjectID(listId),
      userId: userId,
    };
    const newTodo = {
      $push: {
        todos: {
          _id: todoId,
          title: body.title,
          done: body.done,
          description: body.description
        }
      }
    };
    return this._dbo.collection("todoList")
        .updateOne(listQuery, newTodo)
        .then(() => todoId.toString());
  }
  
  updateTodo(userId, listId, todoId, body) {
    const query = {
      _id: ObjectID(listId),
      userId: userId,
      "todos._id": ObjectID(todoId)
    };
    const update = {
      $set: {
        "todos.$.title": body.title,
        "todos.$.done": body.done,
        "todos.$.description": body.description
      }
    };
    return this._dbo.collection("todoList")
        .updateOne(query, update);
  }
}

module.exports = TodoRepository;
