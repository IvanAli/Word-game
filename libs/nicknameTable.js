var nicknames = {};
var currId = 1;

var addEntry = function(nickname) {
    nicknames[currId] = nickname;
    return currId++;
}

var deleteEntry = function() {

}

module.exports = {
    addEntry: addEntry,
    deleteEntry: deleteEntry
}
