import { follow, unFollow } from '../models/follow';
import { isAuth } from '../../help/help';

async function UnFollow(a, { input }) {
    return await unFollow(input)
}
async function Follow(a, { input }: any) {
    return await follow(input)
}
export default {
    Mutation: {
        follow: isAuth(Follow),
        unFollow: isAuth(UnFollow)
    }
}