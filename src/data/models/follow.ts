import mongoose from 'mongoose';
const followSchema = new mongoose.Schema({
    idUser: String,
    idUserFollow: String
})
const followModel = mongoose.model('Article', followSchema)
//virtual one to many  , idUser in followSchema (one) => idUser in User Schema (Many)
followSchema.virtual('userFollow', {
    foreignField: 'idUser',
    localField: 'idUserFollow',
    ref: 'users',
})
followSchema.set('toObject', { virtuals: true });
followSchema.set('toJSON', { virtuals: true });
// check moi quan he 
export interface followType {
    idUser: String, // people are monitored
    idUserFollow: String // id user follower
}

// we show who follow idUser , yes user have id is idUserFollow
export function Follow(follow: followType) {
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
        followModel.deleteOne(follow, (err) => {
            if (err) {
                resolve(err)
            }
        })
    })
}

// export function deleteArticle({ idArticle, idUser }: { idArticle: String, idUser: String }) {
//     return new Promise(resolve => {
//         articleModel.deleteOne({ idArticle }, (err) => {
//             if (err) {
//                 resolve(err)
//             }
//         })
//     })
// }

// export function addArticle(article: ArticleType) {
//     const newArticle = new articleModel(article)
//     return new Promise(resolve => {
//         newArticle.save((err, data) => {
//             if (err) {
//                 resolve(err)
//             }
//             // console.log('câcs', data)
//             resolve(data)
//         })
//     })
// }

// export function getArticleById(idArticle: string) {

//     return new Promise(resolve => {
//         articleModel.find({ idArticle }, function (err, data) {
//             if (err) {
//                 resolve(err)
//             }
//             resolve(data)
//         })

//     })
// }

// export function getArticleByCategory(idUser: string) {

//     return new Promise(resolve => {
//         articleModel.find({ idUser }, function (err, data) {
//             if (err) {
//                 resolve(err)
//             }
//             resolve(data)
//         })

//     })
// }
// export function getArticleByHashTag(hashTag: string) {

//     return new Promise(resolve => {
//         articleModel.find({ hashTag }, function (err, data) {
//             if (err) {
//                 resolve(err)
//             }
//             resolve(data)
//         })

//     })
// }