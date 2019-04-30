import { getHashTagByIdHashTag , getHashTagAll} from '../models/hashtag';
import { isAuth } from '../../help/help';
async function GetHashTagByIdHashTag(a, { id }) {
    return await getHashTagByIdHashTag(id)
}

async function GetHashTagAll(a,) {
    return await getHashTagAll()
}


export default {
    Query: {
        getHashTagByIdHashTag: isAuth(GetHashTagByIdHashTag),
        getHashTagAll : isAuth(GetHashTagAll)
    }
}
