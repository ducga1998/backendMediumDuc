// import { connection } from 'mongoose';

import io from 'socket.io'
import { addUser, createRoom, IRoom } from '../data/models/room';
import uuid from 'uuid';
const socketAuth = function socketAuth(socket, next) {
    console.log('socket.id', socket.id)
    return next();
    return next(new Error('Nothing Defined'));
};

const roomConnection = (socket) => {
    // console.log('in roomConnection ')
    socket.on('addRoom', data => {
        const { title, idUser } = data
        const idRoom = uuid()
        createRoom({ idRoom, title, idUser })
        socket.emit('updateListRooms', { idRoom, title, idUser })
    })
    socket.on('chat', (data) => {
        socket.emit('chat2', data)
    })
};
const chatConnection = socket => {
    socket.on('join', async data => {
        const { idUser, idRoom } = data
        console.log('user vao room roi me oi !!', data)
        const dataRoom = await addUser({ socketid: socket.id, idUser, idRoom })
        console.log('data room when user join', dataRoom)
    })
}
export const startIo = function startIo(server) {
    const io2 = io.listen(server);
    // in front end , if your use roomSocket  => 
    const room = io2.of('/room').on('connection', roomConnection);
    // in front end , if your use chatSocket  => 
    const chat = io2.of('/chat').on('connection', chatConnection);
    // room.use(socketAuth);
    // chat.use(socketAuth)

    return io;
};