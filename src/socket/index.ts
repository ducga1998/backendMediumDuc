// import { connection } from 'mongoose';

import io from 'socket.io'
import { addUser, createRoom, IRoom } from '../data/models/room';
import uuid from 'uuid';
import { addMessage } from '../data/models/message';
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
// all chat user
const chatConnection = socket => {
    let count = 0
    let idRoomNew = 0
    socket.on('join', data => {
        count = count + 1;

        const { idUser, idRoom } = data

        idRoomNew = idRoom
        socket.join(idRoom)
        const dataRoom = addUser({ socketid: socket.id, idUser, idRoom })
    })
    socket.on('newMessage', async function (idroom, input) {
        const { content, idUser } = input
        // add idroom beause in database need it : )))) 
        input.idRoom = idroom

        socket.in(idroom).emit('addMessage', content)
        const dataMessage = await addMessage(input)
    })
    socket.on('disconnect', function () {
        count--;
        socket.leave(idRoomNew)
    })
}
const notificationConnection = (socket) => {
    // join idUser mà viết ra bài viết 
    // let idUserLeave
    socket.on('join', idUser => {

        socket.join(idUser)
    })
    // this is function will call when other comment 
    socket.on('notificationMessage', (idUser, data) => {
        socket.to(idUser).emit('notificationRun', data)
    })
    socket.on('leave', idUser => {

        socket.leave(idUser)
    })
    socket.on('disconnect', function () {
        console.log('user leave ')

    })
}
export const startIo = function startIo(server) {
    const io2 = io.listen(server);
    // in front end , if your use roomSocket  => 
    const room = io2.of('/room').on('connection', roomConnection);
    // in front end , if your use chatSocket  => 
    const chat = io2.of('/chat').on('connection', chatConnection);
    const notification = io2.of('/notification', notificationConnection)
    // const A = io.of('/', () => {
    // })

    // room.use(socketAuth);
    // chat.use(socketAuth)

    return io;
};