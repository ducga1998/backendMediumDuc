import  uuid from 'uuid';
import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
    idNotification: String,
    type :String,
    notificationData : Object,
    idUser :String,
    time : {
        type:String,
        default : new Date().toUTCString()
    }
})
const notificationModel = mongoose.model('notification', notificationSchema)
export interface NotificationType {
    idUser: string,
    notificationData : any
    type : string
}
export function getAllNotifiOfUser(idUser: string, offset :number , first : number) {
    return new Promise(resolve => {
        notificationModel.find({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            data = first === undefined ? data.reverse().slice(offset) : data.reverse().slice(offset, offset + first);
            resolve(data)
        })
    })
}

export function getAllNotifiOfArticle( idArticle: string ) {
    return new Promise(resolve => {
        notificationModel.find({ idArticle }, (err, data) => {
            if (err) {
                resolve(err)
            }           
            resolve(data)
        })
    })
}
export function deleteNotification(idNotification: string) {
    return new Promise(resolve => {
        notificationModel.deleteOne({ idNotification }, (err) => {
            if (err) {
                resolve(err)
            }
        })
    })
}
export function addNotification(notification: NotificationType) {
    const idNotification  = uuid()
    const newNotifiCation = new notificationModel({...notification , ...{idNotification} })
    return new Promise(resolve => {
        newNotifiCation.save(function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}

