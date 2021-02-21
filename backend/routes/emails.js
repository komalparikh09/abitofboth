const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of emails
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
  const emails = [];
  db.getDb()
    .db()
    .collection('emails')
    .find()
    .sort({ emailId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(emailDoc => {
      emails.push(emailDoc);
    })
    .then(result => {
      res.status(200).json(emails);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single user
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('emails')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then(emailDoc => {
      res.status(200).json(emailDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Register a new user and generate a unique user ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newEmail = {
    emailCode: req.body.emailCode,
    emailSubject: req.body.emailSubject,
    emailTo: req.body.emailTo,
    emailFrom: req.body.emailFrom,
    emailBody: req.body.emailBody
  };
  db.getDb()
    .db()
    .collection('emails')
    .insertOne(newEmail)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your Email ID: ', emailId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your Email ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing user
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedEmail = {
    emailCode: req.body.emailCode,
    emailSubject: req.body.emailSubject,
    emailTo: req.body.emailTo,
    emailFrom: req.body.emailFrom,
    emailBody: req.body.emailBody
  };
  db.getDb()
    .db()
    .collection('emails')
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: updatedEmail
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'Email details updated successfully: ', emailId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a user
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('emails')
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then(result => {
      res.status(200).json({ message: 'Email record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;