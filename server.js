const express = require('express');
const app = express();
const PORT = 4000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const database = require('./database');
const session = require('./sessions');

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.checkSession(sid);
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;
    if (!session.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    if (username.length > 6) {
        res.status(403).json({ error: 'excessive-length' });
        return;
    }

    const sid = session.addSession(username);
    database.addUser(username);
    res.cookie('sid', sid);
    res.json({ username });
});

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.checkSession(sid);
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        session.deleteSession(sid);
    }
    res.json({ wasLoggedIn: !!username });
});

app.get('/api/v1/notes', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.checkSession(sid);
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const allNotes = database.getAllNotes();

    res.json(allNotes);
});

app.get('/api/v1/notes/:author', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.checkSession(sid);
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const author = req.params.author;
    const authorNotes = database.getNotesByAuthor(author);
    res.json(authorNotes);
});

app.post('/api/v1/notes', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.checkSession(sid);
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const note = req.body;
    const id = uuidv4();
    const newNote = {
        id: id,
        title: note.title,
        author: username,
        tag: note.tag,
        content: note.content,
    };
    database.addNote(newNote);
    res.json(database.getAllNotes());
});

app.patch('/api/v1/notes/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.checkSession(sid);
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const note = req.body;
    const id = note.id;
    const newNote = {
        id: id,
        title: note.title,
        author: username,
        tag: note.tag,
        content: note.content,
    };

    database.updateNote(id, newNote);
    res.json(database.getAllNotes());
});

app.delete('/api/v1/notes/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.checkSession(sid);
    const id = req.params.id;
    const author = database.getAuthorById(id);
    const canDelete = username === 'admin' || author === username;

    if (!sid || !username || !author || !canDelete) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    database.deleteNote(id, author);
    res.json(database.getAllNotes());
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));