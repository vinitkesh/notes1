import React, { useState } from 'react';
import styles from './Note.module.css';

const Note = ({ notes, onDelete }) => {
    const [deleteNoteId, setDeleteNoteId] = useState(null);

    const handleDeleteClick = (id) => {
        // Show a browser alert for confirmation
        const isConfirmed = window.confirm('Are you sure you want to delete this note?');
        if (isConfirmed) {
            onDelete(id);
        }
    };

    const handleConfirmDelete = () => {
        onDelete(deleteNoteId);
        setDeleteNoteId(null);
    };

    const handleCancelDelete = () => {
        setDeleteNoteId(null);
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
