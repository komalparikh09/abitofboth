const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of memories
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
  const memories = [];
  db.getDb()
    .db()
    .collection('memories')
    .find()
    .sort({ memoryId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(memoryDoc => {
      memories.push(memoryDoc);
    })
    .then(result => {
      res.status(200).json(memories);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single memory
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('memories')
    .findOne({ _id: req.params.id })
    .then(memoryDoc => {
      res.status(200).json(memoryDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Create a new memory and generate a unique memory ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newMemory = {
    image: req.body.image,
    video: req.body.video,
    title: req.body.title,
    event: req.body.event
  };
  db.getDb()
    .db()
    .collection('memories')
    .insertOne(newMemory)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your Memory ID: ', memoryId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your Memory ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing memory
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedMemory = {
    image: req.body.image,
    video: req.body.video,
    title: req.body.title,
    event: req.body.event
  };
  db.getDb()
    .db()
    .collection('memories')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedMemory
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'Memory details updated successfully: ', memoryId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a memory
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('memories')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Memory record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;