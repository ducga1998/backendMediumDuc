import { getAllAricleByIdArticle } from '../models/hashtag';
async function GetAllAricleByIdArticle(a, { input }) {
    return await getAllAricleByIdArticle(input)
}
export default {
    Query: {
        getAllAricleByIdArticle: GetAllAricleByIdArticle,
    }
}
