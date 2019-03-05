import mongoose from 'mongoose';
import { getAllInformationUser, userModel } from './user';
const roomSchema = new mongoose.Schema({
    idUser: String, // idUser admin room
    idRoom: String,
    idUserReceive:String,
    ownerUserInfo : Object,
    clientInfo : Object
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
export async function createRoom(input: InputAddRoom) {
    const {idUser , idUserReceive  } = input
    console.log('input', input)
  
    const ownerUserInfo  =  await userModel.findOne({idUser}).exec()
    const clientInfo  =  await userModel.findOne({idUser : idUserReceive}).exec()
    return new Promise( resolve => {
        const newRoom = new roomModel({...input , ...{ownerUserInfo , clientInfo}})
        newRoom.save(async (err, data) => {
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
            })      
        })
    })
}