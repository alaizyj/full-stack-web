import './gridnote.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/Context';
import { deleteNote, handleError } from '../../services/service';

export default function GridNote({
  note,
  id,
  handleView,
  handleAdd,
  setEditNote,
  setNotes,
  setAuthor,
}) {
  const { user } = useContext(UserContext);
  const canEdit = user === note.author;
  const canDelete = user === 'admin' || canEdit;
  const [error, setError] = useState('');

  const handleEdit = () => {
    handleAdd(true);
    setEditNote(note);
  };
  return (
    <div className='grid-note'>
      <p className='grid-note-title'>{note.title}</p>
      <p
        className='grid-note-author'
        onClick={() => {
          handleView(note.author);
        }}
      >
        {note.author}
      </p>
      <p className={`grid-note-${note.tag}`}>{note.tag}</p>
      <div className='grid-note-content'>{note.content}</div>
      <div className='gridnote-buttons'>
        {canEdit && (
          <button className='gridnote-edit-button' onClick={handleEdit}>
            Edit
          </button>
        )}
        {canDelete && (
          <button
            className='gridnote-delete-button'
            onClick={() => {
              deleteNote(id)
                .then((response) => {
                  setNotes(response);
                  setAuthor('');
                  setEditNote({});
                  setError('');
                })
                .catch((err) => {
                  setError(handleError(err));
                });
            }}
          >
            Delete
          </button>
        )}
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}
