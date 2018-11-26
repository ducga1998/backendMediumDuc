import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    idUser: String,
    idRoom: String,
    content: String,

}, {
        timestamps: true
    })
messageSchema.virtual('userMessage', {
    foreignField: 'idUser',
    localField: 'idUser',
    ref: 'users',
    justOne: true
})
messageSchema.virtual('roomMessage', {
    foreignField: 'idRoom',
    localField: 'idRoom',
    ref: 'room',
    justOne: true
})
export const messageModel = mongoose.model('message', messageSchema)
export interface IMessage {
    idRoom: string,
    content: string,
    idUser: string
}
// this function will add user in room, include info   { idUser ,  }
export function addMessage(input: IMessage) {
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
export function getAllMessageByIdRoom(idRoom) {
    return new Promise(resolve => {
        messageModel.find({ idRoom }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        }).populate('roomMessage').populate('userMessage')
    })
}

// just  need idUser => add idUser room => why idUser
// first : 
