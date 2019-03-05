import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema({
    idUser: String, // idUser admin room
    idRoom: String,
    idUserReceive:String,
})
roomSchema.virtual('messages', {
    foreignField: 'idRoom',
    localField: 'idRoom',
    ref: 'message'
})
export const roomModel = mongoose.model('room', roomSchema)
export interface IRoom {
    idRoom: string,
    idUserReceive: string , 
    idUser: string
}
interface InputAddRoom {
    idRoom: string,
    idUser: string,
    idUserReceive : string,
}
export function createRoom(input: InputAddRoom) {
    console.log('InputAddRoom',input)
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

export function getRoomByIdUser(idUser: string) {
    console.log('run getRoomByIdUser', idUser)
    return new Promise(resolve => {
        roomModel.find({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
// in the world 
export function getAllRoomById(id) {
    console.log('getRoomById',id)
    return new Promise(resolve => {
        roomModel.find({idUser : id}, (err, dataUser) => {
            if(err){
                resolve([])
            }
            roomModel.find({idUserReceive : id} , (err, dataUserReceive) => {
                if(err){
                    resolve([])
                }
                const data = [...dataUser , ...dataUserReceive]
                resolve(data)
            }).populate('messages')       
        }).populate('messages')
    })
}