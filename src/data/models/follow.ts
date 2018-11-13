import mongoose from 'mongoose'
const followSchema = new mongoose.Schema({
    idUser: String,
    idUserFollow: String
})
const followType = mongoose.model('Article', followSchema)
export interface follow {
    idUser: String,
    idUserFollow: String
}

export function addFollow(follow: followType) {
    const { idArticle } = article
    return new Promise(resolve => {
        articleModel.updateOne({ idArticle }, (err: any, data: any) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
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