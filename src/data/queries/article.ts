import { getAllArticle, getArticleByCategory, getArticleByHashTag, getArticleById } from '../models/article';
async function GetArticleByCategory(name: string) {
    return await getArticleByCategory(name)
}
async function GetArticleById(id: string) {
    return await getArticleById(id)
}
async function GetArticleByHashTag(name: string) {
    return await getArticleByHashTag(name)
}
async function GetAllArticle() {
    console.log(await getAllArticle())
    return await getAllArticle()
}

export default {
    Query: {
        getArticleByCategory: GetArticleByCategory,
        getArticleById: GetArticleById,
        getArticleByHashTag: GetArticleByHashTag,
        getAllArticle: GetAllArticle
    }
}
