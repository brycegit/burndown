var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;

var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

var dburl = process.env.PROD_MONGODB  || 'mongodb://localhost:27017/burndown';

app.listen(port, () => {
  console.log('UP AND RUNNING!');
});

mongo.connect(dburl, (err, db) => {
  setStatus(db);
  db.close();
})

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '/../' + 'public')));
app.use(bodyParser.json());

//GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/tasks', (request, response) => {
  mongo.connect(dburl, (err, db) => {
    // assert.equal(null, err);
    console.log('Connected to database');
    getTasks(db, response);
  })
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//POST
app.post('/', (req, res) => {
  mongo.connect(dburl, (err, db) => {
    if (req.body.budget) {
      updateStatus(db, req.body.budget, 'budget');
    }
    if (req.body.time) {
      updateStatus(db, req.body.budget, 'time');
    }
    if (req.body.id) {
      updateTask(db, req.body);
    } else {
      console.log('Connected to database');
      console.log('body', req.body);
      var input = {
        name: req.body.name,
        estimate: Number(req.body.estimate),
        percent: Number(req.body.percent)
      }
      console.log('input on server', input);
      addTasks(db, input);
    }
    db.close();
  })
  res.status(201).send();
});

// FUNCTIONS
const updateStatus = (db, val, type) => {
  var tasks = db.collection('status');
  var update = new Promise((res, rej) => {
    tasks.update({name: status}, {$set: {[type]: val}}).toArray((err, result) => {
      if (err) {
        rej();
      }
      res(result);
    });
  })
  .then((result) => console.log('SUCCESS'))
  .catch((err) => console.log('ERROR: ', error))
}

const setStatus = (db) => {
  var tasks = db.collection('status');
  var add = new Promise((res, rej) => {
    tasks.insertOne({name: 'status', budget: 0, time: 0}, (err, result) => {
      if (err) {
        rej();
      }
      res(result);
    });
  })
  .then((result) => {
    console.log('STATUS SET');
  })
  .catch((err) => console.log('ERROR: ', error))
}

const updateTask = (db, body) => {
  var id = body.id;
  var name = body.name;
  var est = body.estimate;
  var perc = body.percent;
  var tasks = db.collection('tasks');
  var o_id = new ObjectId(id);
  var update = new Promise((res, rej) => {
    tasks.update({_id: o_id}, {$set: {name: name, estimate: Number(est), percent: Number(perc)}}).toArray((err, result) => {
      if (err) {
        rej();
      }
      res(result);
    });
  })
  .then((result) => console.log('RESULTS FROM FIND', result))
  .catch((err) => console.log('ERROR: ', error))
}

const addTasks = (db, task) => {
  var tasks = db.collection('tasks');
  var add = new Promise((res, rej) => {
    tasks.insertOne(task, (err, result) => {
      if (err) {
        rej();
      }
      res(result);
    });
  })
  .then((result) => {
  })
  .catch((err) => console.log('ERROR: ', error))
}

const getTasks = (db, response) => {
  var tasks = db.collection('tasks');
  var get = new Promise((res, rej) => {
    tasks.find().toArray((err, result) => {
      if (err) {
        rej();
      }
      res(result);
    });
  })
  .then((result) => {
    response.status(200).send(result);
    db.close();
  })
  .catch((err) => console.log('ERROR: ', error))
}
