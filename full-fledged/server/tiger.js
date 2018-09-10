var tigerRouter = require('express').Router();
var _ = require('lodash');

var tigers = [];
var id = 0;

tigerRouter.param('id', function(req,res,next,id){
    var tiger = _.find(tigers,{id: parseInt(req.params.id)});
    req.tiger = tiger;
    next();
})

var incrementIdMiddleware = function(req,res,next){
    var tiger = req.body;
    id++;
    tiger.id = id;
    next();
}

tigerRouter.get("/", function(req,res,next){
    res.send(tigers);
    // next(new Error("Nope"));
})

tigerRouter.get("/:id", function(req,res){
    console.log('tigers',req)
    res.json(req.tiger || {});
})

tigerRouter.post("/",incrementIdMiddleware, function(req,res){
    tigers.push(req.body);
    res.send(req.body);
})

tigerRouter.put("/:id", function(req,res){

    var incomingObject = req.body;

    var index = _.findIndex(tigers, {id: req.params.id});
    if(tigers[index]){
        var tigerUpdated = _.assign(tigers[index], incomingObject);
        res.json(tigerUpdated);
    }else{
        res.send(); // do nothing
    }
})

tigerRouter.delete("/:id", function(req,res){
    _.remove(tigers,{id: parseInt(req.params.id)}); // mutates the array
    res.json(tigers);
})

module.exports = tigerRouter;