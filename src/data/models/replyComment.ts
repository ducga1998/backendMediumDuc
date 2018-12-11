import mongoose from 'mongoose';
//comment user ? , article ?
export const relySchema = new mongoose.Schema({
    idRely: String, // this is idComment rely
    idComment: String, // this is idComment has been rely comment above
}, {
        timestamps: true
    })
export const relyModel = mongoose.model('rely', relySchema)
export function addRelyComment(comment) {
    const newComment = new relyModel(comment)
    return new Promise(resolve => {
        newComment.save((err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}

// id comment have comment  model will auto map relyModel 





