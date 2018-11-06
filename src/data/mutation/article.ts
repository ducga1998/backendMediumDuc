
// import { session } from 'express-session';
//MUTATION IS WHERE AUTHECATION , QUERY DATA  , IT IS RESLOVER 

import { addArticle, deleteArticle, updateArticle, ArticleType } from '../models/article'

async function AddArticle({ request: { body: { variables: { ep } } }, session }: any) {

    console.log('AddArticle')
    return await addArticle(ep)
}
async function DeleteArticle(input: { idUser: string, idArticle: string }) {
    return await deleteArticle(input)
}
async function UpdateArticle(input: ArticleType) {
    return await updateArticle(input)
}
export default {
    Mutation: {
        addArticle: AddArticle,
        deleteArtice: DeleteArticle,
        updateArticle: UpdateArticle
    }
}