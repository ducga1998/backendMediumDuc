import mongoose from 'mongoose';
import { omit } from 'lodash';
import { filterStringHTML } from '../../help/help';
export const articleSchema = new mongoose.Schema({
    idUser: String,
    idArticle: String,
    contentArticle: String,
    titleArticle: String,
    hashTag: [String],
    category: [String],
    totalClap: Number,
    notification: String,
    imageArticle: {
        type : String , 
        default : 'http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg'
    },
    createTime: String,
    count: Number
})
articleSchema.virtual('user', {
    foreignField: 'idUser',
    localField: 'idUser',
    ref: 'users',
    justOne: true
})
articleSchema.virtual('comment', {
    foreignField: 'idArticle',
    localField: 'idArticle',
    ref: 'comment',
    justOne: false
})
articleSchema.virtual('bookmark', {
    foreignField: 'idArticle',
    localField: 'idArticle',
    ref: 'bookmark',
    justOne: false
})


articleSchema.set('toObject', { virtuals: true });
articleSchema.set('toJSON', { virtuals: true });
const articleModel = mongoose.model('Article', articleSchema)

export interface ArticleType {
    idUser: String,
    idArticle: String,
    hashTag?: [String],
    category?: [String],
    totalClap?: Number,
    notification?: String,
    contentArticle?: String,
    titleArticle?: String,
    imageArticle?: String,
    createTime?: String,
    users?: any
}
export function updateArticle(article: any) {
    const { idArticle, idUser } = article
    console.log('article', article)
    const data = omit(article, ['idArticle', 'idUser'])
    return new Promise(resolve => {
        articleModel.updateMany({ idArticle, idUser }, data, (err: any, data: any) => {
            if (err) {
                resolve(err)
            }
            console.log('data', data)
            resolve(data)
        })
    })
}

export function deleteArticle({ idArticle, idUser }: { idArticle: String, idUser: String }) {
    return new Promise(resolve => {
        articleModel.deleteOne({ idArticle }, (err) => {
            if (err) {
                resolve(err)
            }
        })
    })
}

export function addArticle(article: ArticleType) {
    const newArticle = new articleModel({ ...article, ... { totalClap: 0 } })
    return new Promise(resolve => {
        newArticle.save((err, data) => {
            if (err) {
                resolve(err)
            }
            // console.log('câcs', data)
            resolve(data)
        })
    })
}
export function countArticle() {
    return new Promise(resolve => {
        articleModel.countDocuments((err, count) => {
            if (err) {
                resolve(err)
            }
            resolve(count)
        })
    })
}
/*
    getAllArticle() => get all article we have in database
    parameter :
    - first  => limit count article
    - offset => start index article
    - search => swich mode search 
*/
export function getAllArticle(first = undefined, offset = 0, search = false) {

    return new Promise(resolve => {
        articleModel.find({}, function (err, data) {
            if (err) {
                resolve(err)
            }
            if (search) {
                const searchData = data.map((item: any) => {
                    item.titleArticle = filterStringHTML(item.titleArticle)
                    return item
                })
                // console.log
                resolve(searchData)
            }
            const count = data.length
            // data will 
            data = first === undefined ? data.reverse().slice(offset) : data.reverse().slice(offset, offset + first);
            // console.log({ ...data, ...{ count } })
            resolve(data)
        }).populate('user').populate('comment').populate('bookmark')
    })
}

export function getArticleById(idArticle: string) {
    return new Promise(resolve => {
        articleModel.findOne({ idArticle }, function (err, data  : any[]) {
            if (err) {
                resolve(err)
            }
            // console.log('articlesssss',data)
            resolve(data)
        }).populate('user').populate('comment').populate('bookmark')
    })
}

export function getArticleByCategory(idUser: string) {

    return new Promise(resolve => {
        articleModel.find({ idUser }, function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })

    })
}
export function getArticleByHashTag(hashTag: string) {

    return new Promise(resolve => {
        articleModel.find({ hashTag }, function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })

    })
}