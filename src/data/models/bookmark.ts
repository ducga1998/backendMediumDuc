import mongoose from 'mongoose';
// follow user 
const bookmarkSchema = new mongoose.Schema({
    idUser: String,
    idArticle: String,
})
//in document  have idUser => idUserFollow 
//id usr follow là id user mà đi follow người khác 
// idUser laf 
bookmarkSchema.virtual('userFollow', {
    foreignField: 'idUser',
    localField: 'idUserFollow',
    ref: 'users',
    justOne: true
})
const followModel = mongoose.model('follow', bookmarkSchema)
//virtual one to many  , idUser in bookmarkSchema (one) => idUser in User Schema (Many)

bookmarkSchema.set('toObject', { virtuals: true });
bookmarkSchema.set('toJSON', { virtuals: true });
// check moi quan he 
export interface bookmarkType {
    idUser: String, // people are monitored
    idUserFollow: String // id user follower
}

// we show who follow idUser , yes user have id is idUserFollow
export async function follow(follow: bookmarkType) {
    let countFollow
    await followModel.countDocuments(follow, (err, count) => {
        console.log(count)
        countFollow = count
    })
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
        followModel.find({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            console.log('câcsjkcn', data)
            resolve(data)
        }).populate('userFollow')
    })
}
export function unFollow(follow: bookmarkType) {
    return new Promise(resolve => {
        followModel.deleteMany(follow, (err) => {
            if (err) {
                resolve(err)
            }
        })
    })
}