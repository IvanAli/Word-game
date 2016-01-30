var express = require('express');
var loader = require('./libs/loader.js');
var alphabet = require('./libs/alphabet.js');
var app = express();

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

loader.fillDictionary('/usr/share/dict/words');

app.get('/', function(request, response) {
    words = [];
    for (var i = 0; i < 5; i++) words.push(loader.getRandomWord());
    // console.log(words.length);
    console.log(alphabet.letters);
    response.render('game', {words: words, letters: alphabet.letters});
});

app.listen(3000, function() {
    console.log("Express");
});
