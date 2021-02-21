const path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './app/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index_bundle.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       { test: /\.(js)$/, use: 'babel-loader' },
//       { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
//     ]
//   },
//   devServer: {
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'app/index.html'
//     })
//   ]
// };

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;

const productRoutes = require('./routes/products');
const doctorsRoutes = require('./routes/doctors');
const patientsRoutes = require('./routes/patients');
const appointmentRoutes = require('./routes/appointment');
const searchdoctorsRoutes = require('./routes/searchdoctors');
const errorlogRoutes = require('./routes/errorlog');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const eventRoutes = require('./routes/events');
const postRoutes = require('./routes/posts');
const gameRoutes = require('./routes/games');
const quizRoutes = require('./routes/quizzes');
const initiativeRoutes = require('./routes/initiatives');
const emailRoutes = require('./routes/emails');
const memoryRoutes = require('./routes/memories');
const interestpathRoutes = require('./routes/interestpaths');
const registeredusersRoutes = require('./routes/registeredusers');

const db = require('./db');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);
app.use('/home', homeRoutes);
app.use('/doctors', doctorsRoutes);
app.use('/patients', patientsRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/searchdoctors', searchdoctorsRoutes);
app.use('/errorlog', errorlogRoutes);
app.use('/events', eventRoutes);
app.use('/posts', postRoutes);
app.use('/games', gameRoutes);
app.use('/quizzes', quizRoutes);
app.use('/initiatives', initiativeRoutes);
app.use('/emails', emailRoutes);
app.use('/memories', memoryRoutes);
app.use('/interestpaths', interestpathRoutes);
app.use('/registeredusers', registeredusersRoutes);

// mongodb.connect('mongodb+srv://abitofbothmember:abitofbothmember123@abitofboth.bkdjm.mongodb.net/networking?retryWrites=true&w=majority')
//   .then(client => {
//     console.log('Connected!');
//     client.close();
//   })
//   .catch(err => {
//     console.log(err);
//   });

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3100);
  }
});
