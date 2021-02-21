const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of initiatives
router.get('/', (req, res, next) => {
  const queryPage = req.query.page;
  const pageSize = 1;
  // let resultProducts = [...products];
  // if (queryPage) {
  //   resultProducts = products.slice(
  //     (queryPage - 1) * pageSize,
  //     queryPage * pageSize
  //   );
  // }
  const initiatives = [];
  db.getDb()
    .db()
    .collection('initiatives')
    .find()
    .sort({ initiativeId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(initiativeDoc => {
      initiatives.push(initiativeDoc);
    })
    .then(result => {
      res.status(200).json(initiatives);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single initiative
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('initiatives')
    .findOne({ _id: req.params.id })
    .then(initiativeDoc => {
      res.status(200).json(initiativeDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Register a new initiative and generate a unique initiative ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newInitiative = {
    initiativeCreatedBy: req.body.initiativeCreatedBy,
    initiativeName: req.body.initiativeName,
    initiativeType: req.body.initiativeType,
    initiativeDescription: req.body.initiativeDescription,
    initiativeDuration: req.body.initiativeDuration,
    paidIndicator: req.body.paidIndicator,
    chargecodeIndicator: req.body.chargecodeIndicator
  };
  db.getDb()
    .db()
    .collection('initiatives')
    .insertOne(newInitiative)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your Initiative ID: ', initiativeId: result.insertedId });
        .json({ message: 'Registered successfully. Please save your Initiative ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing initiative
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedInitiative = {
    initiativeCreatedBy: req.body.initiativeCreatedBy,
    initiativeName: req.body.initiativeName,
    initiativeType: req.body.initiativeType,
    initiativeDescription: req.body.initiativeDescription,
    initiativeDuration: req.body.initiativeDuration,
    paidIndicator: req.body.paidIndicator,
    chargecodeIndicator: req.body.chargecodeIndicator
  };
  db.getDb()
    .db()
    .collection('initiatives')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedInitiative
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'Initiative details updated successfully: ', initiativeId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete an initiative
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('initiatives')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Initiative record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;