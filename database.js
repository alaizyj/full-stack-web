const uuid = require('uuid').v4;
const sid1 = uuid();
const sid2 = uuid();
const sid3 = uuid();

const users = { Yajian: [sid1, sid2, sid3] };

function addUser(username) {
    if (!users[username]) {
        users[username] = [];
    }
}

const notes = {};

notes[sid1] = {
    id: sid1,
    title: 'Two Sum',
    author: 'Yajian',
    tag: 'Easy',
    content: 'The brute-force approach is through inner-loop.This problem can be solved using HashMap to achieve a better time complexity.',
};

notes[sid2] = {
    id: sid2,
    title: 'Add Two Numbers',
    author: 'Yajian',
    tag: 'Medium',
    content: 'This is a linked-list problem. The edge cases that worthy noting are the sum of two numbers may exceed 10, which will result in a carry-on.',
};

notes[sid3] = {
    id: sid3,
    title: 'Longest Valid Parentheses',
    author: 'Yajian',
    tag: 'Hard',
    content: 'When the problem is related to parentheses, the most commonly used data structure is Stack. This prolem requires a two-direction loop.',
};

function addNote(newNote) {
    notes[newNote.id] = newNote;
    users[newNote.author].push(newNote.id);
}

function deleteNote(id, author) {
    delete notes[id];
    const updateIds = users[author].filter((noteid) => noteid != id);
    users[author] = updateIds;
}

function updateNote(id, note) {
    notes[id] = note;
}

function getAllNotes() {
    const notesArray = Object.entries(notes).map((noteinfo) => noteinfo[1]);
    return notesArray;
}

function getNotesByAuthor(author) {
    const notesArray = [];
    for (const id of users[author]) {
        notesArray.push(notes[id]);
    }
    return notesArray;
}

function getAuthorById(id) {
    if (notes[id]) {
        return notes[id].author;
    }
    return '';
}

const database = {
    notes,
    users,
    addUser,
    addNote,
    deleteNote,
    updateNote,
    getAllNotes,
    getNotesByAuthor,
    getAuthorById,
};

module.exports = database;