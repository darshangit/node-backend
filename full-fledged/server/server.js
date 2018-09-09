var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

app.use(morgan('dev')) 
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.param('id', function(req,res,next,id){
    var lion = _.find(lions,{id: parseInt(req.params.id)});
    req.lion = lion;
    next();
})

var incrementIdMiddleware = function(req,res,next){
    var lion = req.body;
    id++;
    lion.id = id;
    next();
}

var lions = [];
var id = 0;

app.get("/lions", function(req,res,next){
    res.send(lions);
    // next(new Error("Nope"));
})

app.get("/lions/:id", function(req,res){
    console.log('lions',req)
    res.json(req.lion || {});
})

app.post("/lions",incrementIdMiddleware, function(req,res){
    lions.push(req.body);
    res.send(req.body);
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

app.use(function(err,req,res,next){

    if(err){
        res.status(500).send(err);
    }
    console.log('Error Middleware', err)
}) // Error middle ware


app.listen(3000, () =>{
    console.log('Listening on port', 3000);
});
