var express = require('express');
var loader = require('./libs/loader.js');
var alphabet = require('./libs/alphabet.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

loader.fillDictionary('/usr/share/dict/words');

app.get('/', function(request, response) {
    words = [];
    for (var i = 0; i < 5; i++) words.push(loader.getRandomWord());
    // console.log(words.length);
    // console.log(alphabet.letters);
    response.render('game', {words: words, letters: alphabet.letters});
});

io.on('connection', function(socket) {
    // send the alphabet to every user that gets connected (this is the full alphabet)
    io.emit('alphabet update', alphabet.letters);
    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on('key add', function(letter) {
        // remove the letter typed in from the alphabet
        var reducedAlphabet = alphabet.removeLetter(letter, alphabet.letters);
        io.emit('alphabet update', reducedAlphabet);
    });
});

http.listen(3000, function() {
    console.log("Express running on port 3000");
});
