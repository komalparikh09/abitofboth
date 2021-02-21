const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of quizzes
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
  const quizzes = [];
  db.getDb()
    .db()
    .collection('quizzes')
    .find()
    .sort({ quizId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(quizDoc => {
      quizzes.push(quizDoc);
    })
    .then(result => {
      res.status(200).json(quizzes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single quiz
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('quizzes')
    .findOne({ _id: req.params.id })
    .then(quizDoc => {
      res.status(200).json(quizDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Create a new quiz and generate a unique quiz ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newQuiz = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    specialization: req.body.specialization,
    totalExperience: req.body.totalExperience,
    workingDays: req.body.workingDays,
    visitingHoursFrom: req.body.visitingHoursFrom,
    visitingHoursTo: req.body.visitingHoursTo
  };
  db.getDb()
    .db()
    .collection('quizzes')
    .insertOne(newQuiz)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your Quiz ID: ', quizId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your Quiz ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing quiz
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedQuiz = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    specialization: req.body.specialization,
    totalExperience: req.body.totalExperience,
    workingDays: req.body.workingDays,
    visitingHoursFrom: req.body.visitingHoursFrom,
    visitingHoursTo: req.body.visitingHoursTo
  };
  db.getDb()
    .db()
    .collection('quizzes')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedQuiz
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'Quiz details updated successfully: ', quizId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a quiz
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('quizzes')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Quiz record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;