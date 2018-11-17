
// import { session } from 'express-session';
//MUTATION IS WHERE AUTHECATION , QUERY DATA  , IT IS RESLOVER 

import { addArticle, deleteArticle, updateArticle } from '../models/article';

async function AddArticle(a, { input }) {


    return await addArticle(input)
}
async function DeleteArticle(input: { idUser: string, idArticle: string }) {
    return await deleteArticle(input)
}
async function UpdateArticle(a, { input }) {
    console.log('AddArsacascticle', input)
    return await updateArticle(input)
}
export default {
    Mutation: {
        addArticle: AddArticle,
        deleteArtice: DeleteArticle,
        updateArticle: UpdateArticle
    }
}