
import mongoose from 'mongoose';
import { getArticleById, articleModel } from './article';
// follow user 
const bookmarkSchema = new mongoose.Schema({
    idUser: String,
    idArticle: String,
    idUserBookMark: String
})

//in document  have idUser => idUserFollow 
//id usr follow là id user mà đi follow người khác 
// idUser laf 

bookmarkSchema.virtual('userBookMark', {
    foreignField: 'idUser',
    localField: 'idUserBookMark',
    ref: 'users',
    justOne: true
})
// idUser  => this is idUser write article, we are people write article 
bookmarkSchema.virtual('userOwnArticle', {
    foreignField: 'idUser',
    localField: 'idUser',
    ref: 'users',
    justOne: true
})
bookmarkSchema.virtual('articleBookMark', {
    foreignField: 'idArticle',
    localField: 'idArticle',
    ref: 'Article',
    justOne: true
})
bookmarkSchema.set('toObject', { virtuals: true });
bookmarkSchema.set('toJSON', { virtuals: true });
const bookmarkModel = mongoose.model('bookmark', bookmarkSchema)
//virtual one to many  , idUser in bookmarkSchema (one) => idUser in User Schema (Many)


// check moi quan he 
export interface bookmarkType {
    idUser: String, // people are monitored
    idUserFollow: String // id user follower
}

// we show who follow idUser , yes user have id is idUserFollow
export async function bookMark(input) {
    console.log('user book mark ', input)
    const { idArticle, idUser, idUserBookMark } = input
   
    // check  count bookmark exies 
    let countBookMark = await  bookmarkModel.countDocuments({ idArticle, idUser }).exec()
    if (countBookMark > 0 || countBookMark == undefined) {
        return
    }

    const newBookMark = new bookmarkModel(input)

    return new Promise(resolve => {
        newBookMark.save((err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function unBookMark({ idUserBookMark, idArticle }) {
    return new Promise(resolve => {
        bookmarkModel.deleteMany({ idUserBookMark, idArticle }, (err) => {
            if (err) {
                resolve(err)
            }
        })
    })
}

export function getAllArticleHasBeenBookMark(idUserBookMark) {
    console.log('idUserBookMark', idUserBookMark)
    return new Promise(resolve => {
        bookmarkModel.find({ idUserBookMark }, async (err, articleBookmarks) => {
            if (err) {
                resolve(err)
            }
            
            const data = await Promise.all(articleBookmarks.map(async  article  => {
                const {idArticle} = article as any
                const articleBookMark  = await articleModel.findOne({idArticle}).populate('hashTagData')
                // const articleBookMark  =  await getArticleById(idArticle)
                console.log('article ====> AA',articleBookMark)
                return {...article , ...{articleBookMark}}
            }))
            console.log('articleBookMark ====>',data)
            resolve(data)
           
        }).populate('userOwnArticle')
    })
}
export function isBookMark({ idArticle, idUserBookMark }) {
    return new Promise(resolve => {
        bookmarkModel.countDocuments({ idArticle, idUserBookMark }, (err, count) => {
            if (err) {
                resolve(false)
            }
            console.log(count, idArticle, idUserBookMark)
            if (count > 0) {

                resolve(true)
            }
            resolve(false)
        })
    })
}
