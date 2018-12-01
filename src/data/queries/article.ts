import { isAuth } from '../../help/help';
// import { session } from 'express-session';
import { getAllArticle, getArticleByCategory, getArticleByHashTag, getArticleById } from '../models/article';
async function GetArticleByCategory(name: string) {
    return await getArticleByCategory(name)
}
async function GetArticleById(input: any, { id }, session) {
    // console.log(session)
    // console.log('get article ', id)
    return await getArticleById(id)
}
async function GetArticleByHashTag(name: string) {
    return await getArticleByHashTag(name)
}
async function GetAllArticle() {
    // console.log(await getAllArticle())
    return await getAllArticle()
}

export default {
    Query: {
        getArticleByCategory: isAuth(GetArticleByCategory),
        getArticleById: isAuth(GetArticleById),
        getArticleByHashTag: isAuth(GetArticleByHashTag),
        getAllArticle: isAuth(GetAllArticle)
    }
}
