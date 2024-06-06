import React, { useState } from 'react';
import './Note.module.css';

const Note = ({ notes, onDelete }) => {
    const [deleteNoteId, setDeleteNoteId] = useState(null);

    const handleDeleteClick = (id) => {
        // Show a browser alert for confirmation
        onDelete(id);
        console.log('Note deleted');
    };
    

    return (
        <div>
            <ul>
            {notes.map(note => (
                    <li key={note.id}>
                        {note.data}
                        <button onClick={() => handleDeleteClick(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Note;
