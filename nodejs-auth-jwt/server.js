const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const movies = require('./routes/movies') ;
const users = require('./routes/users');
const userCartView = require('./routes/userCartView');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000; 
app.set('secretKey', 'nodeRestApi'); // jwt secret token
require('dotenv').config(); //for accessing env files 
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))
app.get('/', (req, res) => {
        res.send('Hello World')
})
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.get('/', function(req, res){
res.json({"tutorial" : "Build REST API with node.js"});
});
// public route
app.use('/users', users);
// private route
app.use('/movies', validateUser, movies);
app.use('/userCarts',validateUser, userCartView);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});
function validateUser(req, res, next){
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"Error in authentication", message: err.message, data:null});
    }else{
      next();
    }
  });
}
app.use(function(req, res, next) {
 let err = new Error('Not Foundssssss');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
  console.log(err);
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.listen(port, () => {
  console.log(`Node server listening on port http://localhost:${port}`);
});