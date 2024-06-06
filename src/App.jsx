import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import { database } from './firebase';
import Note from './Note';
import './App.module.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        const notesRef = ref(database, 'notes');
        onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notesArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setNotes(notesArray);
            } else {
                setNotes([]);
            }
        });
    };

    const addNote = () => {
        if (!newNote.trim()) {
            console.error('Note cannot be empty');
            return;
        }

        const notesRef = ref(database, 'notes');
        push(notesRef, { data: newNote })
            .then(() => {
                setNewNote('');
            })
            .catch((error) => {
                console.error('Error adding note:', error);
            });
    };

    const handleDelete = (id) => {
        const noteRef = ref(database, `notes/${id}`);
        remove(noteRef)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting note:', error);
            });
    };

    return (
        <div>
            <h1>Notes</h1>
            <textarea
                style={{ resize: 'none', overflow: 'hidden' }}
                value={newNote}
                onKeyDown={(e) => { if (e.key === 'Enter') console.log('Enter pressed') }}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your text here..."
            />

            <button onClick={addNote}>Add Note</button>
            <Note notes={notes} onDelete={handleDelete} />
        </div>
    );
}

export default App;
