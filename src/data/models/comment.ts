import mongoose from 'mongoose';
//comment user ? , article ?
export const commentSchema = new mongoose.Schema({
    idUser: String,
    idArticle: String,
    content: String,
    totalLike: Number
})
commentSchema.virtual('user', {
    foreignField: 'idUser',
    localField: 'idUser',
    ref: 'users',
})
commentSchema.virtual('article', {
    foreignField: 'idUser',
    localField: 'idArticle',
    ref: 'Article',
})
commentSchema.set('toObject', { virtuals: true });
commentSchema.set('toJSON', { virtuals: true });
const commentModel = mongoose.model('comment', commentSchema)
export function getAllCommentInTheArticle(idArticle) {
    return new Promise(resolve => {
        commentModel.find({ idArticle }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}


