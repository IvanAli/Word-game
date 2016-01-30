var nicknames = {};
var currId = 1;

function getRandomHexColor() {
    // credits to Paul Irish: http://www.paulirish.com/2009/random-hex-color-code-snippets/
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

var addEntry = function(nickname) {
    nicknames[currId] = {
        id: currId,
        nickname: nickname,
        color: getRandomHexColor()
    }
    return nicknames[currId++];
}

var deleteEntry = function() {

}

module.exports = {
    addEntry: addEntry,
    deleteEntry: deleteEntry
}
