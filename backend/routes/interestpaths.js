const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of interestpaths
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
  const interestpaths = [];
  db.getDb()
    .db()
    .collection('interestpaths')
    .find()
    .sort({ interestpathId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(interestpathDoc => {
      interestpaths.push(interestpathDoc);
    })
    .then(result => {
      res.status(200).json(interestpaths);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single interestpath
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('interestpaths')
    .findOne({ _id: req.params.id })
    .then(interestpathDoc => {
      res.status(200).json(interestpathDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Create a new interestpath and generate a unique interestpath ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newInterestPath = {
    interestCode: req.body.interestCode,
    interestDescription: req.body.interestDescription
  };
  db.getDb()
    .db()
    .collection('interestpaths')
    .insertOne(newInterestPath)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your InterestPath ID: ', interestpathId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your InterestPath ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing interestpath
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedInterestPath = {
    interestCode: req.body.interestCode,
    interestDescription: req.body.interestDescription
  };
  db.getDb()
    .db()
    .collection('interestpaths')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedInterestPath
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'InterestPath details updated successfully: ', interestpathId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a interestpath
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('interestpaths')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'InterestPath record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;