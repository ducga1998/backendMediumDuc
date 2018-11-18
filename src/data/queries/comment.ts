import { getAllCommentInTheArticle } from '../models/comment';
async function GetAllCommentInTheArticle(a, { input }) {
    return await getAllCommentInTheArticle(input)
}
export default {
    Query: {
        getAllCommentInTheArticle: GetAllCommentInTheArticle,
    }
}
