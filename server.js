// Dependencies
const express = require('express');
const {v4 : uuidv4} = require('uuid')
const fs = require('fs');
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

app.get('/api/notes', (req, res) => {
    res.status(200).json(`${req.method} request received to get notes.`);
    console.info(`${req.method} request received to get notes.`);
    return data;
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note.`);

    // Destructuring assignment for the properties in req.body
    const {title, text} = req.body;

    const noteId = uuidv4();
    // Execute operation when the required properties are present.
    if (title && text) {

        // Variable named newNote is the object we will save into
        const newNote = {
            title,
            text,
            noteId
        };
    
        // Will obtain any existing notes if any are available.
        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                // return res.status(500).json('Error in posting note');
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);
        
                // Add a new note
                parsedNotes.push(newNote);
        
                // Write the updated notes back to the file
                fs.writeFile(
                    './db/notes.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes!'),
                    res.status(201).json(response),
                    console.log(response)
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };
    } else {
        res.status(500).json('Error in posting note!!');
    }
});

// Listener
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));