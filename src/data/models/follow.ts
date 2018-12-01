import mongoose from 'mongoose';
// follow user 
const followSchema = new mongoose.Schema({
    idUser: String,
    idUserFollow: String
})
//in document  have idUser => idUserFollow 
//id usr follow là id user mà đi follow người khác 
// idUser laf 
followSchema.virtual('userFollow', {
    foreignField: 'idUser',
    localField: 'idUserFollow',
    ref: 'users',
    justOne: true
})
const followModel = mongoose.model('follow', followSchema)
//virtual one to many  , idUser in followSchema (one) => idUser in User Schema (Many)

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
    if (countFollow > 0 || countFollow == undefined) {
        return
    }

    const newFollow = new followModel(follow).populate('userFollow')

    return new Promise(resolve => {
        newFollow.save(async (err, saveData) => {
            if (err) {
                resolve(err)
            }
            resolve(saveData)
        })
    })
}

export function getAllInfomationUserFollowYour(idUser) {
    console.log('id user into follow model', idUser)
    return new Promise(resolve => {
        followModel.find({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            console.log('câcsjkcn', data)
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