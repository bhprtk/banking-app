'use strict';

var express = require('express');
var router = express.Router();

var Tran = require('../models/tran');

// /api
router.route('/')
  .get((req, res) => {

    Tran.get((err, trans) => {
      if(err) {
        return res.status(400).send(err);
      }

      res.send(trans);
    })

  })
  .post((req, res) => {
    Tran.create(req.body, (err, newTran) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(newTran);
    });
  });

router.delete('/:id', (req, res) => {
  Tran.removeById(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.put('/', (req, res) => {
  Tran.update(req.body, (err, trans) => {
    if(err) return res.status(400).send(err);
    res.send(trans);
  });
});



module.exports = router;
