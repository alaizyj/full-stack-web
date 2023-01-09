import './notes.css';
import { useEffect, useState, useContext } from 'react';
import ListNote from '../listnote/ListNote';
import GridNote from '../gridnote/GridNote';
import Pagination from '../pagination/Pagination';
import AddNote from '../addnote/AddNote';
import { UserContext } from '../../context/Context';
import { fetchNotes } from '../../services/service';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 8;
  const [loading, setIsLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [author, setAuthor] = useState('');
  const [add, setAdd] = useState(false);

  const [editNote, setEditNote] = useState({});

  const { user, dispatch } = useContext(UserContext);

  const updateNotes = (author) => {
    fetchNotes(author)
      .then((notes) => {
        setNotes(notes);
        setIsLoading(false);
      })
      .catch((error) => {
        setTimeout(() => {
          dispatch({ type: 'LOGIN_FAIL' });
        }, 2500);
      });
  };

  useEffect(() => {
    updateNotes(author);
    const intervalId = setInterval(() => {
      updateNotes(author);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [author]);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalNotes = notes.length;
  const totalPages = Math.ceil(totalNotes / notesPerPage);

  const notesTitle = author === '' ? 'All' : author + "'s notes";
  const notesTopBarTitle = notesTitle + ' (' + notes.length + ')';

  const handleAdd = (value) => {
    setAdd(value);
  };

  const handleView = (user) => {
    setAuthor(user);
    setAdd(false);
  };

  return (
    <div className='notes-page'>
      <div className='notes-topbar'>
        {!add && (
          <div className='notes-topbar-add'>
            <p className='notes-view-title'>{notesTopBarTitle}</p>
            {author === '' && (
              <button
                className='mynotes-button'
                onClick={() => {
                  handleView(user);
                }}
              >
                My Notes
              </button>
            )}

            <button
              className='addnote-button'
              onClick={() => {
                handleAdd(!add);
              }}
            >
              Add
            </button>

            {author !== '' && (
              <button
                className='goback-button'
                onClick={() => {
                  setAuthor('');
                }}
              >
                Back
              </button>
            )}
          </div>
        )}
        {!add && (
          <div className='notes-view-buttons'>
            <button
              className={
                view === 'grid'
                  ? 'notes-view-button chosen-view'
                  : 'notes-view-button'
              }
              onClick={() => setView('grid')}
            >
              Grid
            </button>
            <button
              className={
                view === 'list'
                  ? 'notes-view-button chosen-view'
                  : 'notes-view-button'
              }
              onClick={() => setView('list')}
            >
              List
            </button>
          </div>
        )}
      </div>
      {view === 'list' && !add && (
        <div className='list-notes'>
          {currentNotes.map((note) => (
            <ListNote
              key={note.id}
              id={note.id}
              note={note}
              handleView={handleView}
              handleAdd={handleAdd}
              setEditNote={setEditNote}
              setNotes={setNotes}
              setAuthor={setAuthor}
            />
          ))}
        </div>
      )}
      {view === 'grid' && !add && (
        <div className='grid-notes'>
          {currentNotes.map((note) => (
            <GridNote
              key={note.id}
              id={note.id}
              note={note}
              handleView={handleView}
              handleAdd={handleAdd}
              setEditNote={setEditNote}
              setNotes={setNotes}
              setAuthor={setAuthor}
            />
          ))}
        </div>
      )}
      {currentNotes.length > 0 && !add && (
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentNotes={currentNotes}
          totalNotes={totalNotes}
        />
      )}{' '}
      {notes.length === 0 && !add && !loading && (
        <div className='empty-notes'>
          <p className='empty-notes-message'>
            You do not have any notes, try add one!
          </p>
        </div>
      )}
      {add && (
        <AddNote
          note={editNote}
          handleAdd={handleAdd}
          setNotes={setNotes}
          setAuthor={setAuthor}
          setEditNote={setEditNote}
        />
      )}
    </div>
  );
}
