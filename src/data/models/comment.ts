import mongoose from 'mongoose';
//comment user ? , article ?
export const commentSchema = new mongoose.Schema({
    idUser: String,
    idArticle: String,
    content: String,
    totalLike: {
        type: Number,
        default: 0
    }
})
commentSchema.virtual('userComment', {
    foreignField: 'idUser',
    localField: 'idUser',
    ref: 'users',
    justOne: true
})
commentSchema.virtual('articleComment', {
    foreignField: 'idUser',
    localField: 'idArticle',
    ref: 'Article',
    justOne: true
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
        }).populate('articleComment').populate('userComment')
    })
}
export function addCommentIntoArticle(comment) {
    const newComment = new commentModel(comment)
    return new Promise(resolve => {
        newComment.save(function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}



