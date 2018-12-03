import mongoose from 'mongoose';
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
bookmarkSchema.virtual('userOwnArticle', {
    foreignField: 'idUser',
    localField: 'idUserFollow',
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
    const { idArticle, idUser, idUserBookMark } = input
    let countBookMark;
    // check  count bookmark exies 
    await bookmarkModel.countDocuments({ idArticle, idUser }, (err, count) => {
        // console.log(count)
        countBookMark = count
    })
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

export function getAllBookMarkByIdUser(idUser) {

    return new Promise(resolve => {
        bookmarkModel.find({ idUser }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        }).populate('articleBookMark').populate('userBookMark')
    })
}
export function countBookMarkByIdArtice(idArticle) {
    return new Promise(resolve => {
        bookmarkModel.countDocuments({ idArticle }, (err, count) => {
            if (err) {
                resolve(err)
            }
            resolve(count)
        })
    })
}
