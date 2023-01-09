const uuid = require('uuid').v4;
const sessions = {};
const currentUsers = {};

function addSession(username) {
    if (currentUsers[username]) {
        currentUsers[username].times++;
        return currentUsers[username].sid;
    }
    const sid = uuid();
    const userinfo = {
        times: 1,
        sid: sid,
    };
    currentUsers[username] = userinfo;
    sessions[sid] = username;
    return sid;
}

function checkSession(sid) {
    if (sessions[sid]) {
        return getSessionUser(sid);
    }
    return '';
}

function getSessionUser(sid) {
    return sessions[sid];
}

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function deleteSession(sid) {
    if (!sessions[sid]) {
        return;
    }
    const username = sessions[sid];
    if (currentUsers[username].times === 1) {
        delete sessions[sid];
        delete currentUsers[username];
    } else {
        currentUsers[username].times--;
    }
}

const session = {
    addSession,
    checkSession,
    getSessionUser,
    isValidUsername,
    deleteSession,
};

module.exports = session;