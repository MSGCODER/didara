/**
 * Created by lenn on 17/1/5.
 */

var  socket_io = require('socket.io');
var io;
var guest_number = 1;
var nicknames = {};
var names_used = [];
var current_room = {};

exports.listen = function (server) {
    io = socket_io.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        guest_number = assign_guest_name(socket, guest_number,
            nicknames, names_used);

        joinRoom(socket, 'Lobby');

        handleMessageBroadcasting(socket, nicknames);

        handleNameChangeAttempts(socket, nicknames, names_used);

        handleRoomJoining(socket);

        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.room);
        });

        handleClientDisconnection(socket, nicknames, names_used);
    });
}

function assign_guest_name(socket, guest_number, nicknames, names_used) {
    var name = 'Guest' + guest_number;
    nicknames[socket.id] = name;

}