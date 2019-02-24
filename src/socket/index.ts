// import { connection } from 'mongoose';

import io from 'socket.io'
import { addUser, createRoom, IRoom } from '../data/models/room';
import uuid from 'uuid';
import { addMessage } from '../data/models/message';
import { addNotification } from '../data/models/notifcation';


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
// const chatConnection = socket => {
//     let count = 0
//     let idRoomNew = 0
//     // socket.on('connection', function(socket){
//     //     console.log('ok connection room , OK  ')
//     //     socket.join('some room');
//     //   });
//     socket.on('joinRoom', data => {
//         count = count + 1;

//         const {  idRoom } = data
//         console.log( 'ok ok ok  ', idRoom)
//         socket.join("some room")
//         // const dataRoom = addUser({ socketid: socket.id, idUser, idRoom })
//     })
//     socket.on('newMessage',  async function (idroom, input) {
//         console.log('check content and idRoom ' , idroom , input)
//         const { content } = input
       
//         socket.to('some room').emit('addMessage', content)
       
//     })
//     // socket.on('leave', idUser => {
//     //     socket.leave(idUser)
//     // })
//     socket.on('disconnect', function () {
//         count--;
//         socket.leave(idRoomNew)
//     })
// }
// 
export let instanceSocket  =null
export let instanceSocketMessage = null
const chatMessageConnection = (socket) => {
    socket.on('connection' , () => {
        instanceSocketMessage = socket
    })
    // part chat message connection socket
    socket.on('join', idUser => {
        console.log('==============> join id User',idUser)
        socket.join(idUser)
    })
    socket.on('sendMessage' , dataMess => {
        // dataMesssage  => role,  idUser , value 
        const {idUser }  = dataMess
        socket.in(idUser).emit('receviceMessage' ,dataMess )
    })
    socket.on('leave' , idUserOld => {
        console.log('======= leave iduser Old =====> ' , idUserOld)
        socket.leave(idUserOld)
    })
    socket.on('disconnect', function () {
    })
}  
const notificationConnection = (socket) => {
    // join idUser mà viết ra bài viết 
    // let idUserLeave
     // idUser
    socket.on('join', idUser => {
        console.log('user join ', idUser)
        socket.join(idUser)
    }) 
    instanceSocket = socket
    // this is function will call when other comment 
    // on socket data
    socket.on('newNotification',  data => {
        
        // console.log('data',data)
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
    
    // in front end , if your use roomSocket  => 
    io2.of('/room').on('connection', roomConnection);
    // in front end , if your use chatSocket  => 
    // io2.of('/chat').on('connection', chatConnection);
    // in front end , if your use notificationSocet  => 
    io2.of('/notification', notificationConnection);
    // int front end, if you use chat message
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