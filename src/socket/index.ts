// import { connection } from 'mongoose';

import io from 'socket.io'
import { addUserInRoom, createRoom, IRoom } from '../data/models/room';
import uuid from 'uuid';
const socketAuth = function socketAuth(socket, next) {
    console.log('socket.id', socket.id)
    return next();
    return next(new Error('Nothing Defined'));
};

const socketConnection = (socket) => {
    socket.on('addRoom', data => {
        const { title, idUser } = data
        const idRoom = uuid()
        createRoom({ idRoom, title, idUser })
        socket.emit('eventAddRoom', { idRoom, title, idUser })
    })
    // handle user join room
    socket.on('join', ({ idUser, idRoom }: any) => {

    })
};

export const startIo = function startIo(server) {
    const io2 = io.listen(server);
    const packtchat = io2.of('/packtchat');

    packtchat.use(socketAuth);
    packtchat.on('connection', socketConnection);

    return io;
};