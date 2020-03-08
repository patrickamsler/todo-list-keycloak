const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const keys = require('./keys');

const mongoUrl = `mongodb://${keys.mongoHost}:${keys.mongoPort}/`;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/lists/:userId', (req, res) => {
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) throw err;
        const dbo = db.db("todo");
        const query = { userId: req.params.userId };
        dbo.collection("todoList").find(query).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
        });
      });
});

app.listen(keys.nodePort, function () {
    console.log("Server is running on " + keys.nodePort + " port");
});
