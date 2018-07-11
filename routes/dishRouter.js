
const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');//subo 1 level folders
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
/*.all((req,res,next) => { ===============================================
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');     ELIMINADO PARA END-END
    next();
})========================================================================*/
.get((req,res,next) => {
  Dishes.find({})//devuekve una promise

  .then((dishes)=> {
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(dishes);
  }, (err)=> next(err))
  .catch((err)=>next(err));
  //  res.end('desde dish router Will send all the dishes to you!');
})

.post((req, res, next) => {
   Dishes.create(req.body)
   .then((dish)=>{
       console.log('Dish creado', dish);
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(dish);
   }, (err)=> next(err))
   .catch((err)=>next(err));
   // res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
   
   Dishes.remove({})
   .then((resp) =>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
   }, (err)=> next(err))
   .catch((err)=>next(err));
    // res.end('Deleting all dishes');
});//sólo el último lleva punto y coma. Así se denota que todas las requests son un grupo de instrucciones de .route
dishRouter.route('/:dishId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = dishRouter;