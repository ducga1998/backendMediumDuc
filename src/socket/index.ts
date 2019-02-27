// import { connection } from 'mongoose';

import io from 'socket.io'
import {  createRoom } from '../data/models/room';
import uuid from 'uuid';
import { addNotification } from '../data/models/notifcation';
const roomConnection = (socket) => {
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
export let instanceSocket  =null
export let instanceSocketMessage = null
const chatMessageConnection = (socket) => {
    socket.on('connection' , () => {
        instanceSocketMessage = socket
    })
    socket.on('join', idUser => {
        socket.join(idUser)
    })
    socket.on('sendMessage' , dataMess => {
        const {idUser }  = dataMess
        socket.in(idUser).emit('receviceMessage' ,dataMess )
    })
    socket.on('leave' , idUserOld => {
        socket.leave(idUserOld)
    })
    socket.on('disconnect', function () {
    })
}  
const notificationConnection = (socket) => {
    
    socket.on('join', idUser => {
        socket.join(idUser)
    }) 
    instanceSocket = socket
    socket.on('newNotification',  data => {

        const {idUser, type} = data
        addNotification({idUser,notificationData : data , type   })
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
    const io2 = io.listen(server)
    
    io2.of('/room').on('connection', roomConnection);
   
    io2.of('/notification', notificationConnection);
   
    io2.of('/chatMessage', chatMessageConnection); 
    return io;
};

export default class MessageSocket  {
    constructor(){
        
    }
    connect(socket){
        
    }
    sendMessage() {
        
    }
    
}