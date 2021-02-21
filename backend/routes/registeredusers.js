const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of registeredusers
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
  const registeredusers = [];
  db.getDb()
    .db()
    .collection('registeredusers')
    .find()
    .sort({ registereduserId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(registereduserDoc => {
      registeredusers.push(registereduserDoc);
    })
    .then(result => {
      res.status(200).json(registeredusers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single registereduser
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('registeredusers')
    .findOne({ _id: req.params.id })
    .then(registereduserDoc => {
      res.status(200).json(registereduserDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Create a new registereduser and generate a unique registereduser ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newRegisteredUser = {
    eventId: req.body.eventId,
    emailId: req.body.emailId,
    userName: req.body.userName,
    numberOfTeamMembers: req.body.numberOfTeamMembers,
    isLookingForTeam: req.body.isLookingForTeam
  };
  db.getDb()
    .db()
    .collection('registeredusers')
    .insertOne(newRegisteredUser)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your RegisteredUser ID: ', registereduserId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your RegisteredUser ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing registereduser
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedRegisteredUser = {
    eventId: req.body.eventId,
    emailId: req.body.emailId,
    userName: req.body.userName,
    numberOfTeamMembers: req.body.numberOfTeamMembers,
    isLookingForTeam: req.body.isLookingForTeam
  };
  db.getDb()
    .db()
    .collection('registeredusers')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedRegisteredUser
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'RegisteredUser details updated successfully: ', registereduserId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a registereduser
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('registeredusers')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'RegisteredUser record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;