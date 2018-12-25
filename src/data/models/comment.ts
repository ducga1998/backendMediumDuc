
import mongoose from 'mongoose';
//comment user ? , article ?
import uuid from 'uuid'
import { addRelyComment } from './replyComment';
export const commentSchema = new mongoose.Schema({
    idUser: String,
    idArticle: String,
    content: String,
    totalLike: {
        type: Number,
        default: 0
    },
    idRely : {
        type : String , 
        default : null
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
commentSchema.virtual('relyComment', {
    foreignField: 'idRely',
    localField: 'idComment',
    ref: 'rely',
    justOne: false
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
        }).populate('articleComment').populate('userComment').populate('relyComment')
    })
}
export function addCommentIntoArticle(comment) {
    // const idComment = uuid()
    // console.log('{ ...comment, ...{ idComment } }', { ...comment, ...{ idComment } })
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
//function handle work rely comment
export function addReplyComment(idRely, comment) { 
    console.log('idRely------' , idRely  , 'comment ------------' , comment)
     // add comment in comment modal 
      /// add idRely and  idComment   => 
    return new Promise(resolve =>  {
        
    })        
}





