import mongoose from 'mongoose';
import { omit } from 'lodash';
import { filterStringHTML } from '../../help/help';
import uuid from 'uuid'
import { addManyHashTag } from './hashtag';
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
articleSchema.virtual('hashTagData', {
    foreignField: 'idArticle',
    localField: 'idArticle',
    ref: 'hashtag',
    justOne: false
})


articleSchema.set('toObject', { virtuals: true });
articleSchema.set('toJSON', { virtuals: true });
export const articleModel = mongoose.model('Article', articleSchema)

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

export async function  addArticle(article: ArticleType) {
    // console.log('======> article' , article)
    const {hashTag , idArticle}  = article
    const dataHashTag=  hashTag.map(tag => ({idHashTag: uuid() , nameHashTag : tag , idArticle }))
    const newHashTag  =  await addManyHashTag(dataHashTag)
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
                resolve(searchData)
            } 
            data = first === undefined ? data.reverse().slice(offset) : data.reverse().slice(offset, offset + first);
            console.log('ok data test ===>',data)
            resolve(data)
        }).populate('user').populate('comment').populate('bookmark').populate('hashTagData')
    })
}
// article  {id , name }
// support suggest : => find to name ?
// when add  hashtag => ajax query to name  hashtag 
// 
export function getArticleById(idArticle: string) {
    return new Promise(resolve => {
        articleModel.findOne({ idArticle }, function (err, data  : any[]) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        }).populate('user').populate('comment').populate('bookmark').populate('hashTagData')
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