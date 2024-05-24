import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';
import Styles from './App.module.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const URL = 'https://notes1api.azurewebsites.net/';

    // Fetch notes from the server
    const fetchNotes = async () => {
      try {
          const response = await axios.get('${URL}/api/notes');
          // Convert response.data object into an array
          const notesArray = Object.keys(response.data).map(key => ({
              id: key,
              ...response.data[key]
          }));
          setNotes(notesArray);
      } catch (error) {
          console.error('Error fetching notes:', error);
      }
  };
  

    // Add a new note to the server
    const addNote = async () => {
      try {
          // Check if newNote is empty
          if (!newNote.trim()) {
              console.error('Note cannot be empty');
              return;
          }
  
          const response = await axios.post('${URL}/api/notes', {
              data: newNote
          });
  
          // Update notes state by adding the new note to the existing notes array
          setNotes(prevNotes => [...prevNotes, { id: response.data.name, data: newNote }]);
          setNewNote('');
      } catch (error) {
          console.error('Error adding note:', error);
      }
  };

  const handleDelete = async (id) => {
      try {
          // Implement your delete logic here, for example:
          await axios.delete(`${URL}/api/notes/${id}`);
          setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      } catch (error) {
          console.error('Error deleting note:', error);
      }
    };

    return (
        <div>
            <h1>Notes</h1>
            <textarea
                Styles={"resize: none; overflow: hidden;"}
                value={newNote}
                onKeyDown={(e) => {if(e=='Enter') console.log('Enter pressed')}}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your text here..."
            />

            <button onClick={addNote}>Add Note</button>
            <Note notes={notes} onDelete={handleDelete} />
            
        </div>
    );
}

export default App;
  