import mongoose from 'mongoose';
import { allFiler } from '../../help/help';
const messageSchema = new mongoose.Schema({
        idUser: String,
        idUserReceive: String,
        contentMessage: String,
        idRoom : String,
    }, { timestamps: true }
)
messageSchema.virtual('ownerUserInfo', {
    foreignField: 'idUser',
    localField: 'idUser',
    ref: 'users',
    justOne: true
})
export const messageModel = mongoose.model('message', messageSchema) as any 
export interface IMessage {
    idUserReceive: string,
    contentMessage: string
    idCommunication : string
}
// this function will add user in room, include info   { idUser ,  }
export function getRoomChat(idUser , idUserReceive ) {
    return new Promise(resolve => {
        messageModel.find({idUser } , (err , dataRoom:any ) => {
            if(err){
                resolve(err)
            }
            
            console.log('dataRoom',allFiler(dataRoom))
            resolve(allFiler(dataRoom))
        })
    })
}

export function addMessage(input: IMessage) {
    console.log('message' , input)
    return new Promise(resolve => {
        const newMessage = new messageModel(input)
        newMessage.save((err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function addMessageAsSocket(input ){
    return new Promise(resolve => {
        const newMessage = new messageModel(input)
        newMessage.save((err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function getAllMessageByIdUserReceive( idRoom) {
    return new Promise(resolve => {
        messageModel.find({ idRoom }, (err, data) => {
            console.log('datadata message' , data)
            if (err) {
                resolve(err)
            }
            resolve(data)
        }).populate('ownerUserInfo')
    })
}

// just  need idUser => add idUser room => why idUser
// first : 
