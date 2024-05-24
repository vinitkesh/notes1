const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(cors()); // Enable CORS

// Firebase Realtime Database Configuration
const firebaseUrl = 'https://testserver-5b324-default-rtdb.asia-southeast1.firebasedatabase.app/';

// API Endpoint to fetch notes from Firebase
app.get('/api/notes', async (req, res) => {
    try {
        const response = await axios.get(`${firebaseUrl}/notes.json`);  
        res.send(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching notes' });
    }
});

// API Endpoint to create a new note in Firebase
app.post('/api/notes', async (req, res) => {
    try {
        const response = await axios.post(`${firebaseUrl}/notes.json`, req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Error creating note' });
    }
});

// API Endpoint to delete a note from Firebase
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const response = await axios.delete(`${firebaseUrl}/notes/${noteId}.json`);
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(500).send({ error: 'Error deleting note' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
