import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const firebaseUrl = 'https://testserver-5b324-default-rtdb.asia-southeast1.firebasedatabase.app/';

app.get('/api/notes', async (req, res) => {
    try {
        const response = await axios.get(`${firebaseUrl}/notes.json`);
        res.status(200).send(response.data);
    } 
    catch (error) {
        res.status(500).send({ error: 'Error fetching notes' });
    }
});

app.post('/api/notes', async (req, res) => {
    try {
        const response = await axios.post(`${firebaseUrl}/notes.json`, req.body);
        res.status(201).send({ name: response.data.name });
    } 
    catch (error) {
        res.status(500).send({ error: 'Error creating note' });
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        await axios.delete(`${firebaseUrl}/notes/${noteId}.json`);
        res.sendStatus(204);
    } 
    catch (error) {
        res.status(500).send({ error: 'Error deleting note' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
