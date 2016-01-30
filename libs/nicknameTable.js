var nicknames = {};
var currId = 1;

function getRandomHexColor() {
    // credits to Paul Irish: http://www.paulirish.com/2009/random-hex-color-code-snippets/
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

var addEntry = function(nickname, ip) {
    nicknames[currId] = {
        id: currId,
        nickname: nickname,
        color: getRandomHexColor(),
        wordCounter: 0,
        place: 1,
        ip: ip
    }
    return nicknames[currId++];
}

var deleteEntry = function() {

}

function getPlayer(id) {
    return nicknames[id];
}

function increaseWordCounter(id) {
    nicknames[id].wordCounter++;
    return nicknames[id].wordCounter;
}

module.exports = {
    addEntry: addEntry,
    deleteEntry: deleteEntry,
    getPlayer: getPlayer,
    increaseWordCounter: increaseWordCounter
}
