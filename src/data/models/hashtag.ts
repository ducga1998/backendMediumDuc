const mongoose = require('mongoose')
const { Schema } = mongoose
const hashTagSchema = new Schema({
    idHashTag: String, //  can use uuid 
    nameHashTag: String,
    idArticle: String
})
export interface HashtagType {
    idHashtag?: String, //  can use uuid 
    name?: String
}
const hashtagModel = mongoose.model('hashtag', hashTagSchema)
export function getHashTagAll() {
    return new Promise(resolve => {
        hashtagModel.find({ }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}

export function getHashTagByIdHashTag(idHashtag) {
    return new Promise(resolve => {
        hashtagModel.find({ idHashtag }, (err, data) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
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

// I am add hashtag when write artcle 
export function addManyHashTag(arrHashTag){
    if(arrHashTag && arrHashTag.length > 0){
        hashtagModel.insertMany(arrHashTag , (err , data ) => {
            if(err){
                console.log(err)
            }
            console.log('hash tag add  ===>', data)
        } ) 
    }
}
