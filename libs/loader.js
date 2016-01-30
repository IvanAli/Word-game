var fs = require('fs');
var readline = require('readline');
dict = [];

exports.fillDictionary = function(path, callback) {
    var data = fs.readFileSync(path, 'utf-8');
    dict = data.toString().split('\n');
}

exports.getRandomWord = function() {
    var size = dict.length;
    var index = parseInt(Math.random() * size);
    return dict[index];
}
