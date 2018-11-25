

import { makeExecutableSchema } from 'graphql-tools';
// typedef end
// resolve start
/* MUTATION START */
import articleMutation from './mutation/article';
import commentMutation from './mutation/comment';
import followMutation from './mutation/follow';
import hashtagMutation from './mutation/hashtag';
import notificationMutation from './mutation/notification';
import userMutation from './mutation/user';
/* MUTATION END */
/* QUERIES  START */
import articleQuery from './queries/article';
import commentQuery from './queries/comment';
import followQuery from './queries/follow';
import hashTagQuery from './queries/hashTag';
import notificationQuery from './queries/notification';
import userQuery from './queries/user';
import articleType from './types/articleType';
import commentType from './types/commentType';
import followType from './types/followType';
import hashTagType from './types/hashTagType';
import notificationType from './types/notificationType';
import Root from './types/Root';
import { resolvers, typeDefs } from './types/scalars';
import userType from './types/userType';
import roomType from './types/room'
import roomQuery from './queries/room'



const merge = require('lodash/merge')

/* QUERIES END */
// resolve end
const schema = makeExecutableSchema({
    typeDefs: [
        Root, followType, commentType, articleType,
        hashTagType, notificationType, userType, typeDefs, roomType
    ],
    resolvers: merge(
        {}, resolvers, articleMutation, followMutation,
        commentMutation, hashtagMutation, notificationMutation,
        userMutation, articleQuery, notificationQuery, userQuery,
        hashTagQuery, followQuery, commentQuery, roomQuery
    )
})
export default schema