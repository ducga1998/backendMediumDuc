const mongoose = require('mongoose')
const { Schema } = mongoose
const hashTagSchema = new Schema({
    idtag: String, //  can use uuid 
    name: String,
    idArticle: String
})
hashTagSchema.virtual('articlesSameHashTag', {
    foreignField: 'idArticle',
    localField: 'idArticle',
    ref: 'Article',
})
export interface HashtagType {
    idtag?: String, //  can use uuid 
    name?: String
}
const hashtagModel = mongoose.model('hashtag', hashTagSchema)
export function getAllAricleByIdArticle(idArticle: string) {
    return new Promise(resolve => {
        hashtagModel.find({ idArticle }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        }).populate('articlesSameHashTag')
    })
}
export function deleteHashTag(name: string) {
    return new Promise(resolve => {
        hashtagModel.deleteOne({ name }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function addHashtag(hashtagData: HashtagType) {
    const newHashTag = new hashtagModel(hashtagData)
    return new Promise(resolve => {
        newHashTag.save(function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}

