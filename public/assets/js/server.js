// Dependencies
const express = require('express');
const data = require('.db/db.json')
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('/public'));

// Routes
app.get('/', (req, res) => res.send('index.html'));

app.get('/notes', (req, res) => res.send('notes.html'));

app.get ('/api/notes', (req, res) => res.sendFile(path.join(note)));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    console.log(newNote);

    note.push(newNote);
    res.json(newNote);
})

// Listener
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));