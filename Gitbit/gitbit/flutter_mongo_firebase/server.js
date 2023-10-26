const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Firebase initialization
const serviceAccount = require('./path-to-your-firebase-admin-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-firebase-project-id.firebaseio.com'
});

// MongoDB connection
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Express setup
app.use(express.json());

// Define your API routes here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
