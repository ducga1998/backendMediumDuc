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
    // socket.on('join', data => {
    //     console.log('join ben room cung chay thi vo mom')
    // })
};
// all chat user
const chatConnection = socket => {
    let count = 0
    let idRoomNew = 0
    socket.on('join', data => {
        count = count + 1;
        console.log(count)
        const { idUser, idRoom } = data
        console.log('join')
        idRoomNew = idRoom
        socket.join(idRoom)
        const dataRoom = addUser({ socketid: socket.id, idUser, idRoom })


    })
    socket.on('newMessage', async function (idroom, input) {
        const { content, idUser } = input
        input.idRoom = idroom
        console.log(count)
        socket.broadcast.to(idroom).emit('addMessage', content)
        const dataMessage = await addMessage(input)
    })
    socket.on('disconnect', function () {
        count--;
        socket.leave(idRoomNew)
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