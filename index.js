// index.js
//add ur .env file with SECRET key
const express = require('express');
const bodyParser = require('body-parser');
const { Note, User } = require('./models');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
