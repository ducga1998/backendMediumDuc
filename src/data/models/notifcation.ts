// import { Schema } from 'mongoose';
import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
    idNotification: String,
    idArticle: String,
    idUser: String,
    contentNotification: String
})
const notificationModel = mongoose.model('notification', notificationSchema)
export interface NotificationType {
    idNotification?: String,
    idArticle?: String,
    idUser?: String,
    contentNotification?: String
}
export function getAllNotifiOfUser(idUser: string) {
    return new Promise(resolve => {
        notificationModel.find({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function getAllNotifiOfArticle(idArticle: string) {
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
    const newNotifiCation = new notificationModel(notification)
    return new Promise(resolve => {
        newNotifiCation.save(function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}

