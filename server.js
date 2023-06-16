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

// Route to main page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/html/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/html/notes.html'))
);

// GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => 
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            // return res.status(500).json('Error in retrieving notes');
        } else {
            console.log('Notes retrieved successfully!');
            res.json(JSON.parse(data));
        }
    })
);

// POST Route for a new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note.`);

    // Destructuring assignment for the properties in req.body
    const {title, text} = req.body;

    // Execute operation when the required properties are present.
    if (title && text) {

        // Variable named newNote is the object we will save into
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
    
        // Will obtain any existing notes if any are available.
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
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
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes!'),
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note!!');
    }
});

// Listener
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));