import { getArticleTagByNameHashTag , getHashTagAll} from '../models/hashtag';
import { isAuth } from '../../help/help';
async function GetArticleTagByNameHashTag(a, { id }) {
    return await getArticleTagByNameHashTag(id)
}

async function GetHashTagAll(a,) {
    return await getHashTagAll()
}


export default {
    Query: {
        getArticleTagByNameHashTag: isAuth(GetArticleTagByNameHashTag),
        getHashTagAll : isAuth(GetHashTagAll)
    }
}
