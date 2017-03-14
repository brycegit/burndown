var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;

var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var dburl = process.env.PROD_MONGODB  || 'mongodb://localhost:27017/burndown';

app.listen(port, () => {
  console.log('UP AND RUNNING!');
});

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '/../' + 'public')));
app.use(bodyParser.json());

//GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//POST
app.post('/', (req, res) => {
  mongo.connect(dburl, (err, db) => {
    // assert.equal(null, err);
    console.log('Connected to database');
    console.log('body', req.body);
    var input = {
      week: req.body.week,
      name: req.body.name,
      estimate: req.body.estimate,
      percent: req.body.percent
    }
    console.log('input on server', input);
    addTasks(db, input);
    db.close();
  })
  res.status(201).send();
});

// FUNCTIONS
const addTasks = (db, task) => {
  console.log('add tasks called');
  var tasks = db.collection('tasks');
  var add = new Promise((res, rej) => {
    console.log('promise called');
    tasks.insertOne(task, (err, result) => {
      console.log('insert one called');
      if (err) {
        rej();
      }
      res(result);
    });
  })
  .then((result) => {
    console.log('SUCCESS!');
  })
  .catch((err) => console.log('ERROR: ', error))
}
