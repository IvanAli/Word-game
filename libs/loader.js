var fs = require('fs');
var readline = require('readline');
dict = [];
//
// exports.fillDictionary = function(path, callback) {
//     var data = fs.readFileSync(path, 'utf-8');
//     dict = data.toString().split('\n');
// }
//
// exports.getRandomWord = function() {
//     var size = dict.length;
//     var index = parseInt(Math.random() * size);
//     return dict[index];
// }
//
// exports.getRandomWordSet = function(n) {
//     var set = [];
//     for (var i = 0; i < n; i++) set.push(exports.getRandomWord());
//     console.log(set);
//     return set;
// }

//


var fillDictionary = function(path, callback) {
    var data = fs.readFileSync(path, 'utf-8');
    dict = data.toString().split('\n');
};

var getRandomWord = function() {
    var size = dict.length;
    var index = parseInt(Math.random() * size);
    return dict[index];
}

var getRandomWordSet = function(n) {
    var set = [];
    for (var i = 0; i < n; i++) set.push(getRandomWord());
    console.log(set);
    return set;
}

module.exports = {
    fillDictionary: fillDictionary,
    getRandomWord: getRandomWord,
    getRandomWordSet
}
