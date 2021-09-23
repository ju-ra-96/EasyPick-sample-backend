require('dotenv').config({path: './config.env'});
const express = require('express');
const app = express();
const connectDB = require('./db');
const errorHandler = require('./middleware/error');
const middlewares = require('../backend/middleware/middlewares');
const cors = require('cors');

connectDB();

//app.use(express.json());
app.use(express.urlencoded({extended: true})); //To parse the information from HTTP requests into a useful format
app.use(express.json({inflate: true}));
app.use(cors());
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.send('Api running');
});

app.use('/api/account', require('./routes/account'));
app.use('/api/email', require('./routes/email'));
app.use('/api/recommendation', require('./routes/recommendation'));
app.use('/api/device', require('./routes/device'));
app.use('/api/questionnaire', require('./routes/questionnaire'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/rating', require('./routes/rating'));
app.use(middlewares.allowCrossDomain);

app.use(errorHandler);

const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
