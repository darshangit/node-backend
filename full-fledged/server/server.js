var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var lionRouter = require('./lions')
var tigerRouter = require('./tiger')

app.use(morgan('dev')) 
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req,res,next){ //middleware to log body
    console.log('Body', req.body)
    next();
})
//Routes
app.use('/lions', lionRouter)
app.use('/tigers',tigerRouter);

app.use(function(err,req,res,next){

    if(err){
        res.status(500).send(err);
    }
    console.log('Error Middleware', err)
}) // Error middle ware


app.listen(3000, () =>{
    console.log('Listening on port', 3000);
});
