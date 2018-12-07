import { isAuth } from '../../help/help';
// import { session } from 'express-session';
import { getAllArticle, getArticleByCategory, getArticleByHashTag, getArticleById, countArticle } from '../models/article';
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
async function GetAllArticle(a, { first, offset }) {
    // console.log(await getAllArticle())
    return await getAllArticle(first, offset)
}
async function CountArticle(d, { id }) {
    return await countArticle()
}
export default {
    Query: {
        getArticleByCategory: isAuth(GetArticleByCategory),
        getArticleById: isAuth(GetArticleById),
        getArticleByHashTag: isAuth(GetArticleByHashTag),
        getAllArticle: isAuth(GetAllArticle),
        countArticle: isAuth(CountArticle)
    }
}
