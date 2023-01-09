import './listnote.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/Context';
import { deleteNote, handleError } from '../../services/service';

export default function ListNote({
  note,
  id,
  handleView,
  handleAdd,
  setEditNote,
  setNotes,
  setAuthor,
}) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const canEdit = user === note.author;
  const canDelete = user === 'admin' || canEdit;
  const [error, setError] = useState('');
  const handleEdit = () => {
    handleAdd(true);
    setEditNote(note);
  };

  return (
    <div className='list-note'>
      <div className='list-note-box'>
        <div className='list-note-info'>
          <div className='list-note-title'>{note.title}</div>
          <p
            className='list-note-author'
            onClick={() => {
              handleView(note.author);
            }}
          >
            {note.author}
          </p>
          <p className={`list-note-${note.tag}`}>{note.tag}</p>
        </div>
        <div className='list-note-buttons'>
          {canEdit && (
            <button className='list-note-editbutton' onClick={handleEdit}>
              Edit
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => {
                deleteNote(id)
                  .then((response) => {
                    setNotes(response);
                    setAuthor('');
                    setEditNote({});
                  })
                  .catch((err) => {
                    setError(handleError(err));
                  });
              }}
              className='list-note-deletebutton'
            >
              Delete
            </button>
          )}
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className='list-note-togglebutton'
          >
            {open ? 'Close' : 'View'}
          </button>
        </div>
      </div>
      <div className={open ? 'list-note-content' : 'hidden'}>
        {note.content}
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}
