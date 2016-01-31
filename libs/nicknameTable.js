var nicknames = {};
var currId = 1;

function getRandomHexColor() {
    // credits to Paul Irish: http://www.paulirish.com/2009/random-hex-color-code-snippets/
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

var addEntry = function(nickname, ip) {
    nicknames[ip] = {
        id: ip,
        nickname: nickname,
        color: getRandomHexColor(),
        wordCounter: 0,
        place: 1,
        number: currId++,
        typing: ''
    }
    return nicknames[ip];
}

var setTyping = function(ip, text) {
    nicknames[ip].typing = text;
}

var deleteEntry = function(ip) {
    delete nicknames[ip];
}

function getPlayers() {
    return nicknames;
}

function getPlayer(ip) {
    return nicknames[ip];
}

function increaseWordCounter(ip) {
    nicknames[ip].wordCounter++;
    return nicknames[ip].wordCounter;
}

module.exports = {
    addEntry: addEntry,
    deleteEntry: deleteEntry,
    getPlayer: getPlayer,
    getPlayers: getPlayers,
    increaseWordCounter: increaseWordCounter,
    setTyping: setTyping
}
