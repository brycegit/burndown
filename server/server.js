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
})

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '/../' + 'public')));
app.use(bodyParser.json());

//GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/statusform', (request, response) => {
  response.sendFile(path.join(__dirname + '/../public/status.html'));
});

app.get('/tasks', (request, response) => {
  mongo.connect(dburl, (err, db) => {
    // assert.equal(null, err);
    console.log('Connected to database');
    getTasks(db, response);
  })
});

app.get('/status', (request, response) => {
  mongo.connect(dburl, (err, db) => {
    // assert.equal(null, err);
    console.log('Connected to database');
    getStatus(db, response);
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

app.post('/status', (req, res) => {
  console.log('STATUS HIT', req.body.budget);
  mongo.connect(dburl, (err, db) => {
    if (req.body.budget) {
      updateStatus(db, req.body.budget, 'budget', res);
    }
    if (req.body.time) {
      updateStatus(db, req.body.time, 'time', res);
    }
  })
});

// FUNCTIONS
const updateStatus = (db, val, type, resp) => {
  var status = db.collection('status');
  var update = new Promise((res, rej) => {
    status.update({name: 'status'}, {$set: {[type]: val}}, (err, result) => {
      console.log('GOR RESULT');
      if (err) {
        console.log(err);
        rej();
      }
      res(result);
    });
  })
  .then((result) => {
    console.log('SUCCESS');
    resp.status(201).send(result);
  })
  .catch((err) => console.log('ERROR: ', error))
}

const getStatus = (db, response) => {
  var status = db.collection('status');
  var check = new Promise((res, rej) => {
    status.find().toArray((err, result) => {
      if (err) {
        rej();
      }
      res(result);
    })
  })
  .then((result) => {
    console.log('GOT STATUS');
    response.status(200).send(result);
  })
  .catch((err) => console.log(err))
}

const setStatus = (db) => {
  var status = db.collection('status');
  var check = new Promise((res, rej) => {
    status.find().toArray((err, result) => {
      if (err) {
        rej();
      }
      if (!result.length) {
        console.log('ADDING STATUS');
        var add = new Promise((resp, reje) => {
          status.insertOne({name: 'status', budget: 0, time: 0}, (err, result) => {
            if (err) {
              console.log('ERROR adding status', err);
              rej();
            }
            resp(result);
          });
        })
        .then((result) => db.close())
      } else {
        res(result);
      }
    });
  })
  .then((result) => {

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
    tasks.update({_id: o_id}, {$set: {name: name, estimate: Number(est), percent: Number(perc)}}, (err, result) => {
      console.log('RESULT FONR UPDATE', result);
      if (err) {
        rej();
      }
      res(result);
    })
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
