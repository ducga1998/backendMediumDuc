import { getArticleById } from "./article";

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
const clusterAglo = (hashTags) => {

}
export function getHashTagAll() {
    return new Promise(resolve => {
        hashtagModel.find({}, (err, hashtags) => {
            if (err) {
                resolve(err)
            }
            let flag = ''
            const result = []
            hashtags.forEach(hash => {
                flag = hash.nameHashTag
                // have been check have hash in result ?
                if (!result.map(item => item.nameHashTag).includes(flag)) {
                    result.push(hash)
                }
            });
            resolve(result)
        })
    })
}

export function getArticleTagByNameHashTag(nameHashTag) {
    return new Promise(resolve => {
        hashtagModel.find({ nameHashTag }, async (err, data) => {
            if (err) {
                resolve(err)
            }
            const listIdArticle = await Promise.all(data.map(async hashTag => await getArticleById(hashTag.idArticle)))
            resolve(listIdArticle)
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
export function addManyHashTag(arrHashTag) {
    if (arrHashTag && arrHashTag.length > 0) {
        hashtagModel.insertMany(arrHashTag, (err, data) => {
            if (err) {
                console.log(err)
            }
            return data
            // console.log('hash tag add  ===>', data)
        })
    }
}
