import { userModel } from './../data/models/user';
// import { connection } from 'mongoose';

import io from 'socket.io'
import { addNotification } from '../data/models/notifcation';
import { addMessageAsSocket } from '../data/models/message';
import { getAllInformationUser } from '../data/models/user';
export let instanceSocket  =null
export let instanceSocketMessage = null
const chatMessageConnection = (socket) => {
    socket.on('connection' , () => {
        instanceSocketMessage = socket
    })
    socket.on('join', idUser => {
        socket.join(idUser)
    })
    socket.on('sendMessage' , async dataSend => {
        const  {idRoom , idUser}   = dataSend
        const ownerUserInfo = await userModel.findOne({idUser}).exec()
        console.log('ownerUserInfo', ownerUserInfo)
        addMessageAsSocket(dataSend)
        // dataSend  include : idUser , idUserReceive , contentMessage , idCommuncation
        socket.in(idRoom).emit('receviceMessage' ,{...dataSend , ...{ownerUserInfo}} )
    })
    socket.on('leave' ,oldIdCommuncation => {
        socket.leave(oldIdCommuncation)
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
   
    io2.of('/notification', notificationConnection);
   
    io2.of('/chatMessage', chatMessageConnection); 
    return io;
};
