var lionRouter = require('express').Router();
var _ = require('lodash');

var lions = [];
var id = 0;

//middlewares
lionRouter.param('id', function(req, res, next, id) {
  var lion = _.find(lions, { id: parseInt(req.params.id) });
  req.lion = lion;
  next();
});

var incrementIdMiddleware = function(req, res, next) {
  var lion = req.body;
  id++;
  lion.id = id;
  next();
};

//routeres streamlining

lionRouter
  .route('/')
  .get(function(req, res, next) {
    res.send(lions);
    // next(new Error("Nope"));
  })
  .post(incrementIdMiddleware, function(req, res) {
    lions.push(req.body);
    res.send(req.body);
  });

lionRouter
  .route('/:id')
  .get(function(req, res) {
    console.log('lions', req);
    res.json(req.lion || {});
  })
  .put(function(req, res) {
    var incomingObject = req.body;

    var index = _.findIndex(lions, { id: req.params.id });
    if (lions[index]) {
      var lionUpdated = _.assign(lions[index], incomingObject);
      res.json(lionUpdated);
    } else {
      res.send(); // do nothing
    }
  })
  .delete(function(req, res) {
    _.remove(lions, { id: parseInt(req.params.id) }); // mutates the array
    res.json(lions);
  });

module.exports = lionRouter;
