var express = require('express');
var loader = require('./libs/loader.js');
var alphabet = require('./libs/alphabet.js');
var nicknameTable = require('./libs/nicknameTable.js');
var app = express();
var http = require('http').Server(app);
// var http = require('http');
var io = require('socket.io')(http);

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// define set of words


loader.fillDictionary('words');/*/usr/share/dict*/

var words = loader.getRandomWordSet(5);
var ipaddress;

app.get('/', function(request, response) {
    response.render('pickname');
});

app.get('/game', function(request, response) {
    var nickname = request.query['nickname'];
    var player = nicknameTable.addEntry(nickname, ipaddress);
    io.sockets.on('connection', function(socket) {
        socket.emit('update players', nicknameTable.getPlayers());
    });
    response.render('game', {player: player});
});

function restoreLetters(word, time) {
    var i = 0;
    var timer = setInterval(function() {
        if (i < word.length) {
            var arr = alphabet.addLetter(word[i++]);
            io.emit('alphabet update', arr);
        }
        else {
            clearInterval(timer);
        }
    }, time);
}

function restoreLetters(word) {
    for (var i = 0; i < word.length; i++) {
        var arr = alphabet.addLetter(word[i]);
    }
    io.emit('alphabet update', arr);
}

io.on('connection', function(socket) {
    // set the ip address
    ipaddress = socket.handshake.address;

    // send the alphabet to every user that gets connected (this is the full alphabet)
    io.emit('alphabet update', alphabet.letters);
    socket.on('alphabet update', function(arr) {
        io.emit('alphabet update', arr);
    });

    // send the set of random words to the user
    io.emit('wordset', words);
    // console.log(socket.conn);
    console.log("Connection from: " + ipaddress);

    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected:', ipaddress);
        nicknameTable.deleteEntry(ipaddress);
    });

    socket.on('new word', function(index) {
        // restoreLetters(words[index], 1000);
        restoreLetters(words[index]);
        words[index] = loader.getRandomWord();
        io.emit('new word', words, index);
    });

    // update what every user is typing
    socket.on('update typing', function(id, text) {
        nicknameTable.setTyping(id, text);
        io.emit('update typing', nicknameTable.getPlayer(id));
    });

    socket.on('update counter', function(id) {
        console.log(id);
        console.log(nicknameTable.getPlayer(id).id);
        var wc = nicknameTable.increaseWordCounter(id);
        // console.log(nicknameTable.getPlayer(id).wordCounter);
        io.emit('update counter', nicknameTable.getPlayer(id));
    });
});

app.set('port', process.env.PORT || 8080);
app.set('host', process.env.PORT || '192.168.0.27');
// http.createServer(app).listen(app.get('port'), app.get('host'), function() {
//     console.log('Express server listening on port ' + app.get('port'));
// });

// http.createServer(app).listen(3000, function() {
//     console.log('Express server listening on port ' + 3000);
// });

http.listen(3000, function() {
    console.log('Express server listening on port ' + 3000 + '. Press Ctrl + C to terminate');
});
