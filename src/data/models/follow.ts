import mongoose from 'mongoose';
const followSchema = new mongoose.Schema({
    idUser: String,
    idUserFollow: String
})
const followModel = mongoose.model('follow', followSchema)
//virtual one to many  , idUser in followSchema (one) => idUser in User Schema (Many)
followSchema.virtual('userFollow', {
    foreignField: 'idUser',
    localField: 'idUserFollow',
    ref: 'users',
    justOne: true
})
followSchema.set('toObject', { virtuals: true });
followSchema.set('toJSON', { virtuals: true });
// check moi quan he 
export interface followType {
    idUser: String, // people are monitored
    idUserFollow: String // id user follower
}

// we show who follow idUser , yes user have id is idUserFollow
export async function follow(follow: followType) {
    let countFollow
    await followModel.countDocuments(follow, (err, count) => {
        console.log(count)
        countFollow = count
    })
    console.log('countFollow', countFollow)
    if (countFollow > 0 || countFollow == undefined) {
        return
    }

    const newFollow = new followModel(follow)

    return new Promise(resolve => {
        newFollow.save((err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function getAllInfomationUserFollowYour(idUser) {
    console.log('id user into follow model', idUser)
    return new Promise(resolve => {
        followModel.findOne({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        }).populate('userFollow')
    })
}
export function unFollow(follow: followType) {
    return new Promise(resolve => {
        followModel.deleteMany(follow, (err) => {
            if (err) {
                resolve(err)
            }
        })
    })
}