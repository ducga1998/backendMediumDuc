// import { bookmarkType } from './models/bookmark';
import bookmarkType from './types/bookmarkType'


import { makeExecutableSchema } from 'graphql-tools';
// typedef end
// resolve start
/* MUTATION START */
import articleMutation from './mutation/article';
import commentMutation from './mutation/comment';
import followMutation from './mutation/follow';
import notificationMutation from './mutation/notification';
import userMutation from './mutation/user';
/* MUTATION END */
/* QUERIES  START */
import articleQuery from './queries/article';
import commentQuery from './queries/comment';
import followQuery from './queries/follow';
import notificationQuery from './queries/notification';
import userQuery from './queries/user';
import articleType from './types/articleType';
import commentType from './types/commentType';
import followType from './types/followType';
import notificationType from './types/notificationType';
import Root from './types/Root';
import { resolvers, typeDefs } from './types/scalars';
import userType from './types/userType';
import roomType from './types/room'
// import replyType from './types/replyType'
import roomQuery from './queries/room'
import roomMuation from './mutation/room'
import messageType from './types/messagesType'
import messageQuery from './queries/messages'
import messageMutation from './mutation/comment'
import bookmarkMutation from './mutation/bookmark'
import bookQueries from './queries/bookMark'
// import reply from './mutation/reply'
import hashTagQuery from './queries/hashTag'
import hashTagType from './types/hashTagType'
const merge = require('lodash/merge')

/* QUERIES END */
// resolve end
const schema = makeExecutableSchema({
    typeDefs: [
        Root, followType, commentType, articleType,
         notificationType, userType,
        typeDefs, roomType, messageType, bookmarkType,
        hashTagType
    ],
    resolvers: merge(
        {}, resolvers, articleMutation, followMutation,
        commentMutation,
        userMutation, articleQuery, notificationQuery, userQuery, followQuery, commentQuery, roomQuery, roomMuation ,
         messageQuery, messageMutation,
        bookQueries, bookmarkMutation , hashTagQuery
    )
})
export default schema