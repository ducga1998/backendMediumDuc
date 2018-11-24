import mongoose, { connection } from 'mongoose';
const roomSchema = new mongoose.Schema({
    idUser: String, // idUser admin room
    idRoom: String,
    title: { type: String, required: true },
    connections: { type: [{ idUser: String, socketid: String }], default: [] } // it will infomation all user in room
})
export const roomModel = mongoose.model('room', roomSchema)
export interface IRoom {
    idRoom: string,
    connection?: any[],
    title: string,
    idUser: string
}
// this function will add user in room, include info   { idUser ,  }
export function createRoom(input: IRoom) {
    return new Promise(resolve => {
        const newRoom = new roomModel(input)
        newRoom.save((err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}

// just  need idUser => add idUser room => why idUser
// first : 
interface InputAddRoom {
    idRoom: string,
    idUser: string,
    socketid: string
}
export function addUserInRoom(input) {
    const { idRoom, idUser, socketid } = input
    // roomModel.count({ idRoom })
    return new Promise(resolve => {
        roomModel.findOne({ idRoom }, (err, data: any) => {
            if (err) {
                resolve(err)
            }
            const { connection } = data
            connection.push({ idUser, socketid })
            roomModel.updateOne({ idRoom }, { connection }, (subErr, data) => {
                if (subErr) {
                    resolve(err)
                }
                resolve(data)
            })
        })
    })
}
// find room   => addUser 
export var addUser = function (input: InputAddRoom) {
    const { idRoom, idUser, socketid } = input
    // Get current user's id
    // var userId = socket.request.session.passport.user;
    return new Promise(resolve => {
        roomModel.findOne({ idRoom }, (err, room: any) => {
            if (err) {
                resolve(err)
            }
            var conn = { idUser, socketid };
            room.connections.push(conn);
            room.save((err, data) => {
                if (err) {
                    console.log(err)
                }
                resolve(data)
            });
        })
    })
    // Push a new connection object(i.e. {userId + socketId})

}