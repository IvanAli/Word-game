var express = require('express');
var loader = require('./libs/loader.js');
var alphabet = require('./libs/alphabet.js');
var nicknameTable = require('./libs/nicknameTable.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// define set of words


loader.fillDictionary('words');/*/usr/share/dict*/

var words = loader.getRandomWordSet(5);

app.get('/', function(request, response) {
    response.render('pickname', {host: http.address().address});
});

app.get('/game', function(request, response) {
    var nickname = request.query['nickname'];
    var id = nicknameTable.addEntry(nickname);
    response.render('game', {id: id, nickname: nickname});
});

io.on('connection', function(socket) {
    // send the alphabet to every user that gets connected (this is the full alphabet)
    io.emit('alphabet update', alphabet.letters);
    socket.on('alphabet update', function(arr) {
        io.emit('alphabet update', arr);
    });

    // send the set of random words to the user
    io.emit('wordset', words);
    // console.log(socket.conn);
    var address = socket.handshake.address;
    console.log("Connection from: " + address);

    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    // socket.on('key add', function(letter) {
    //     // remove the letter typed in from the alphabet
    //     console.log("key pressed: " + letter);
    //     var alphabetStructure = alphabet.removeLetter(letter, alphabet.letters);
    //     io.emit('alphabet update', alphabetStructure);
    // });
});

http.listen(3000, function() {
    console.log("Express running on port 3000");
});
