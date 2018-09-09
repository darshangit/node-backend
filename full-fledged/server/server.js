var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
app.get("/lions", function(req,res){
    res.send(lions);
})

app.get("/lions/:id", function(req,res){
    console.log('lions',lions)
    var lion = _.find(lions,{id: parseInt(req.params.id)});
    console.log(lion);
    res.json(lion || {});
})

app.post("/lions", function(req,res){
    var lion = req.body;
    id++;
    lion.id = id;
    lions.push(lion);

    res.send(lion);
})

app.put("/lions/:id", function(req,res){

    var incomingObject = req.body;

    var index = _.findIndex(lions, {id: req.params.id});
    if(lions[index]){
        var lionUpdated = _.assign(lions[index], incomingObject);
        res.json(lionUpdated);
    }else{
        res.send(); // do nothing
    }
})

app.delete("/lions/:id", function(req,res){
    _.remove(lions,{id: parseInt(req.params.id)}); // mutates the array
    res.json(lions);
})


app.listen(3000);
console.log('on port 3000');