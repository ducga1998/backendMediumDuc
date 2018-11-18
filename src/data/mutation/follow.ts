import { follow, unFollow } from '../models/follow';

async function UnFollow(a, { input }) {
    return await unFollow(input)
}
async function Follow(a, { input }: any) {
    return await follow(input)
}
export default {
    Mutation: {
        follow: Follow,
        unFollow: UnFollow
    }
}