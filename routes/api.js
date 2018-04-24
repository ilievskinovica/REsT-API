const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');



// Get a list of ninjas from the database!
router.get('/ninjas', function(req, res, next){
    // // Getting all the ninjas!
    // Ninja.find({}).then(function(ninjas){
    //     res.send(ninjas);
    // })

    // Getting all the near ninjas!
    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
    }).then(function(ninjas) {
        res.send(ninjas);
    })
});



// Add a ninja to the database!
router.post('/ninjas', function(req, res, next){
    // Worse way
    // let ninja = new Ninja(req.body);
    // ninja.save();

    // Better way
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});



// Update a ninja in the database!
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
});



// Delete a ninja from the database!
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});



module.exports = router;