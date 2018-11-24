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
export function addUserInRoom(input) {
    const { idRoom, connections } = input
    return new Promise(resolve => {
        // roomModel.updateOne({})

    })
}
