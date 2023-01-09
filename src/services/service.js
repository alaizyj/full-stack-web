export function fetchLogin(username) {
    return fetch('/api/v1/session', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            credentials: 'include',
            body: JSON.stringify({ username }),
        })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json();
        });
}

export function checkSession() {
    return fetch('/api/v1/session', {
            method: 'GET',
            credentials: 'include',
        })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchLogOut() {
    return fetch('/api/v1/session', { method: 'DELETE', credentials: 'include' })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            return response.json();
        });
}

export function fetchNotes(author) {
    if (!author) {
        return fetch('/api/v1/notes', {
                method: 'GET',
                credentials: 'include',
            })
            .catch((err) => Promise.reject({ error: 'network-error' }))
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => Promise.reject(err));
                }
                return response.json();
            });
    } else {
        return fetch('/api/v1/notes/' + author, {
                method: 'GET',
                credentials: 'include',
            })
            .catch((err) => Promise.reject({ error: 'network-error' }))
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => Promise.reject(err));
                }
                return response.json();
            });
    }
}

export function addNote(note) {
    return fetch('/api/v1/notes', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            credentials: 'include',
            body: JSON.stringify(note),
        })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json();
        });
}

export function updateNote(note, id) {
    return fetch('/api/v1/notes/' + id, {
            method: 'PATCH',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            credentials: 'include',
            body: JSON.stringify(note),
        })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json();
        });
}

export function deleteNote(id) {
    return fetch('/api/v1/notes/' + id, {
            method: 'delete',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            credentials: 'include',
        })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json();
        });
}

const messages = {
    'network-error': 'Please check your Internet connection!',
    'auth-missing': 'Your session expires, please login first!',
    'required-username': 'Username cannot be empty, and should consist of only numbers and digits!',
    'auth-insufficient': 'Sorry dogs, please try another username!',
    'required-message': 'Please input your message!',
    'excessive-length': 'Maximum length of username is 6!',
    default: 'Something went wrong, please try again later!',
};

export function handleError(err) {
    return messages[err.error] || messages.default;
}

export function validate(note) {
    const errors = {};
    if (!note.title) {
        errors.title = 'A title is required!';
    } else if (note.title.length > 30) {
        errors.title = 'Maximum length is 30!';
    }
    if (!note.tag) {
        errors.tag = 'A tag is required!';
    }
    if (!note.content) {
        errors.content = 'Please add some content!';
    } else if (note.content.length > 100) {
        errors.content = 'Maximum length is 100!';
    }
    return errors;
}