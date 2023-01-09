import './addnote.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/Context';
import {
  addNote,
  updateNote,
  validate,
  handleError,
} from '../../services/service';

export default function AddNote({
  note,
  handleAdd,
  setNotes,
  setAuthor,
  setEditNote,
}) {
  const { user } = useContext(UserContext);
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  let title = 'Edit';
  const [error, setError] = useState('');
  if (Object.keys(note).length === 0) {
    note = { title: '', author: user, tag: '', content: '' };
    title = 'Add a note';
  }

  const [newNote, setNewNote] = useState(note);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNotes) => {
      return {
        ...prevNotes,
        [name]: value,
      };
    });
    setFormErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: '',
      };
    });
  };

  const handleInitialAdd = (e) => {
    e.preventDefault();
    setFormErrors(validate(newNote));
    setValidated(true);
  };

  const handleUpdate = (response) => {
    setNotes(response);
    setValidated(false);
    handleAdd(false);
    setAuthor('');
    setNewNote({
      title: '',
      tag: '',
      content: '',
    });
    setEditNote({});
    setError('');
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && validated) {
      if (title === 'Add a note') {
        newNote['author'] = user;
        addNote(newNote)
          .then((response) => {
            handleUpdate(response);
          })
          .catch((error) => {
            setError(handleError(error));
          });
      } else {
        updateNote(newNote, newNote.id)
          .then((response) => {
            handleUpdate(response);
          })
          .catch((error) => {
            setError(handleError(error));
          });
      }
    }
  }, [formErrors]);

  return (
    <div className='addnote-page'>
      <h1 className='add-form-title'> {title} </h1>{' '}
      <form action='' className='add-form' onSubmit={handleInitialAdd}>
        <input
          id='note-title'
          type='text'
          name='title'
          className='normal-input'
          autoFocus={true}
          value={newNote.title}
          placeholder='Note title'
          onChange={handleChange}
        />{' '}
        <p className='form-error'>{formErrors.title}</p>
        <div className='form-row-input'>
          <div className='form-radio-input'>
            <input
              type='radio'
              name='tag'
              value='Easy'
              id='easy-tag'
              checked={newNote.tag === 'Easy'}
              onChange={handleChange}
            />
            <label htmlFor='easy-tag' className='addnote-form-label'>
              Easy
            </label>
          </div>
          <div className='form-radio-input'>
            <input
              type='radio'
              name='tag'
              value='Medium'
              id='medium-tag'
              checked={newNote.tag === 'Medium'}
              onChange={handleChange}
            />
            <label htmlFor='medium-tag' className='addnote-form-label'>
              Medium
            </label>
          </div>
          <div className='form-radio-input'>
            <input
              type='radio'
              name='tag'
              value='Hard'
              id='hard-tag'
              checked={newNote.tag === 'Hard'}
              onChange={handleChange}
            />
            <label htmlFor='hard-tag' className='addnote-form-label'>
              Hard
            </label>
          </div>
        </div>
        <p className='form-error'>{formErrors.tag}</p>
        <textarea
          className='normal-input'
          name='content'
          id=''
          cols='30'
          rows='4'
          placeholder='Write down the content'
          type='text'
          value={newNote.content}
          onChange={handleChange}
        ></textarea>{' '}
        <p className='form-error'>{formErrors.content}</p>
        <button className='addnote-submit-button'>
          {title === 'Edit' ? 'Post' : 'Add'}
        </button>
      </form>
      {error && <p className='error-message'>{error}</p>}
      <button
        className='add-goback-button'
        onClick={() => {
          setAuthor('');
          handleAdd(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}
