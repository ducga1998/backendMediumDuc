
import mongoose from 'mongoose';
//comment user ? , article ?
import uuid from 'uuid'
export const commentSchema = new mongoose.Schema({
    idUser: String,
    idArticle: String,
    content: String,
    totalLike: {
        type: Number,
        default: 0
    },
    idRely: {
        type: String,
        default: null
    },
    idComment: String
}, {
        timestamps: true
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
export function getAllCommentInTheArticle(idArticle, offset: number, first: number = undefined) {
    return new Promise(resolve => {
        commentModel.find({ idArticle }, async (err, allComment) => {
            if (err) {
                resolve(err)
            }
           let  data = allComment.filter((comment:any) => !comment.idRely).reverse().slice(first, first + offset);
         const allRelyComment =  allComment.filter((comment : any) => !! comment.idRely)
            data = [...data  , ...allRelyComment]
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
//function handle work rely commen





