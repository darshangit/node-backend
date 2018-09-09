var express = require('express')
var app = express();
var fs = require('fs');

var jsonData = {count: 12, message: 'hey'};

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html', function(err) {
        if(err){
            res.status(500).send(err);
        }
    })
})

app.get('/fs', function(req,res){
    fs.readFile('index.html',function(err,buff){
        var html = buff.toString();
        res.setHeader('Content-Type','text/html');
        res.send(html);
        
    })
})

app.get("/data", function(req, res){
    res.json(jsonData);
})

app.listen(3000,() => {
    console.log('Node server running on port 3000');
})