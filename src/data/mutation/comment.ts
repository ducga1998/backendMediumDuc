import { isAuth } from '../../help/help';
import { addCommentIntoArticle  } from '../models/comment';
async function AddCommentIntoArticle(a, { input }) {
    return await addCommentIntoArticle(input)
}
export default {
    Mutation: {
        addCommentIntoArticle: isAuth(AddCommentIntoArticle),
    }
}