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
            if (!room.connections.filter(item => item.idUser === idUser)[0]) {
                room.connections.push(conn);
            }

            room.save((err, data) => {
                if (err) {
                    console.log(err)
                }
                resolve(data)
            });
        })
    })
}

export function getRoomByIdUser(idUser: string) {
    return new Promise(resolve => {
        roomModel.find({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function getAllRoom() {
    return new Promise(resolve => {
        roomModel.find({}, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}