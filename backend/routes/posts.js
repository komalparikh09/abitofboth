const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of posts
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
  const posts = [];
  db.getDb()
    .db()
    .collection('posts')
    .find()
    .sort({ postId: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach(postDoc => {
      posts.push(postDoc);
    })
    .then(result => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single post
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('posts')
    .findOne({ _id: req.params.id })
    .then(postDoc => {
      res.status(200).json(postDoc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Create a new post and generate a unique post ID
// Requires logged in user
router.post('', (req, res, next) => {
  const newPost = {
    title: req.body.title,
    caption: req.body.caption,
    tags: req.body.tags,
    postedBy: req.body.postedBy,
    postedDate: req.body.postedDate,
    postedTime: req.body.postedTime,
    image: req.body.image,
    video: req.body.video
  };
  db.getDb()
    .db()
    .collection('posts')
    .insertOne(newPost)
    .then(result => {
      console.log(result);
      res
        .status(201)
        //.json({ message: 'You have been registered successfully. Please save your Post ID: ', postId: result.insertedId });
        .json({ message: 'You have been registered successfully. Please save your Post ID: ' + result.insertedId });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Edit existing post
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedPost = {
    title: req.body.title,
    caption: req.body.caption,
    tags: req.body.tags,
    postedBy: req.body.postedBy,
    postedDate: req.body.postedDate,
    postedTime: req.body.postedTime,
    image: req.body.image,
    video: req.body.video
  };
  db.getDb()
    .db()
    .collection('posts')
    .updateOne(
      { _id: req.params.id },
      {
        $set: updatedPost
      }
    )
    .then(result => {
      res
        .status(200)
        .json({ message: 'Post details updated successfully: ', postId: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a post
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('posts')
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Post record has been deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;