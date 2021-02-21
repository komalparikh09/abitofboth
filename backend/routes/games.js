const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of games
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
  const games = [];
  db.getDb()
    .db()
    .collection('games')
    .find()
    .sort({ gameId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(gameDoc => {
      games.push(gameDoc);
    })
    .then(result => {
      res.status(200).json(games);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single game
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('games')
    .findOne({ _id: req.params.id })
    .then(gameDoc => {
      res.status(200).json(gameDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Create a new game and generate a unique game ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newGame = {
    gameName: req.body.gameName
  };
  db.getDb()
    .db()
    .collection('games')
    .insertOne(newGame)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your Game ID: ', gameId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your Game ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing game
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedGame = {
    gameName: req.body.gameName
  };
  db.getDb()
    .db()
    .collection('games')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedGame
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'Game details updated successfully: ', gameId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a game
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('games')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Game record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;