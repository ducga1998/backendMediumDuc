

import { addHashtag, deleteHashTag, HashtagType } from '../models/hashtag'
async function AddHashtag(input: HashtagType) {
    return await addHashtag(input)
}
async function DeleteHashTag(id: string) {
    return await deleteHashTag(id)
}
export default {
    Mutation: {
        addHashtag: AddHashtag,
        deleteHashTag: DeleteHashTag
    }
}