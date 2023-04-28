// Dependencies
const express = require('express');
const data = require('./db/db.json');
const path = require('path');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/html/index.html'))
);

// // GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/html/notes.html'))
);

app.get('/api/notes', (req, res) => res.sendFile(path.join(data)));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    console.log(newNote);

    note.push(newNote);
    res.json(newNote);
})

// Listener
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));