const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of events
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
  const events = [];
  db.getDb()
    .db()
    .collection('events')
    .find()
    .sort({ eventId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(eventDoc => {
      events.push(eventDoc);
    })
    .then(result => {
      res.status(200).json(events);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single event
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('events')
    .findOne({ _id: req.params.id })
    //.findOne({ _id: new ObjectId(req.params.id) })
    .then(eventDoc => {
      res.status(200).json(eventDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Create a new event and generate a unique event ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newEvent = {
    eventCreatedBy: req.body.eventCreatedBy,
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    eventDuration: req.body.eventDuration,
    eventDescription: req.body.eventDescription,
    registeredUsers: req.body.registeredUsers,
    prizes: req.body.prizes,
    registeredTeams: req.body.registeredTeams,
    interestCode: req.body.interestCode,
    gameIndicator: req.body.gameIndicator,
    quizIndicator: req.body.quizIndicator,
    madePublicIndicator: req.body.madePublicIndicator
  };
  db.getDb()
    .db()
    .collection('events')
    .insertOne(newEvent)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your Event ID: ', eventId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your Event ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing event
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedEvent = {
    eventCreatedBy: req.body.eventCreatedBy,
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    eventDuration: req.body.eventDuration,
    eventDescription: req.body.eventDescription,
    registeredUsers: req.body.registeredUsers,
    prizes: req.body.prizes,
    registeredTeams: req.body.registeredTeams,
    interestCode: req.body.interestCode,
    gameIndicator: req.body.gameIndicator,
    quizIndicator: req.body.quizIndicator,
    madePublicIndicator: req.body.madePublicIndicator
  };
  db.getDb()
    .db()
    .collection('events')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedEvent
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'Event details updated successfully: ', eventId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete an event
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('events')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Event record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;