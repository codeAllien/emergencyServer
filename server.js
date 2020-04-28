/*
Author: Giulia Gallico
timestamp: 26/07/2020 20:46
*/
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

/* Configurations */
const url = 'mongodb://localhost:3307/stats';
mongoose.connect(url, { useNewUrlParser: true })

/* Connection established */
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

/* */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, application/json");
    next();
});

/* Data Object */
var UserData = mongoose.model('User', {
    symptoms: Array,
    positiveContact: Boolean,
    domesticAnimal: Boolean,
    fullAddress: String
})

/* Routes */

/* GET Method */
app.get('/api/users', function(req, res) {
    console.log('Receiving user data');

    UserData.find(function(error, users) {
        if (error) {
            res.send(error);
        }
        res.json(users);
    });
});

/* POST Method */
app.post('/app/users', function(req, res) {
    console.log("Creating a user");
/*
    UserData.create({
        symptoms: req.body.symptoms,
        positiveContact: req.body.positiveContact,
        domesticAnimal: req.body.domesticAnimal,
        fullAddress: req.body.fullAddress,
        done: false
    }, function(error, users) {
        if(error) {
            res.send(error);
        }
        res.json(users);
    });
    */
});

/* DELETE Method */
app.delete('app/users/:user_id', function(req, res) {
    UserData.remove({
        _id: req.params.user_id
    }, function(error, user) {

    });
});

/* Start app und listen to port:8080 */
app.listen(8080);
console.log("App listening on port 8080");