var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017'
const databaseName = 'electric';
let db;


mongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, database) => {
  if (err) throw err;
  db = database.db(databaseName);
  console.log('connected to Mongo')
})

router.post('/form_submit', (req, res, next) => {
  db.collection('students').insertOne({
    name: req.body.student
  })
  res.redirect('/')
})

/* GET home page. */
router.get('/', function (req, res, next) {
  db.collection('students').find().toArray((err, results) => {
    if (err) throw err;
    console.log(results)
    res.render('index', {
      title: 'Express',
      students: results
    });
  })
});


module.exports = router;
