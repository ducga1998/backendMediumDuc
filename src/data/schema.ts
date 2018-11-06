

import { makeExecutableSchema } from 'graphql-tools'
const merge = require('lodash/merge')

//typefdef start

import Root from './types/Root'
import articleType from './types/articleType'
import hashTagType from './types/hashTagType'
import notificationType from './types/notificationType'
import userType from './types/userType'

// typedef end
// resolve start
/* MUTATION START */
import articleMutation from './mutation/article'
import hashtagMutation from './mutation/hashtag'
import notificationMutation from './mutation/notification'
import userMutation from './mutation/user'
/* MUTATION END */
/* QUERIES  START */
import articleQuery from './queries/article';
import notificationQuery from './queries/notification'
import userQuery from './queries/user'
/* QUERIES END */
// resolve end
const schema = makeExecutableSchema({
    typeDefs: [Root, articleType, hashTagType, notificationType, userType],
    resolvers: merge({}, articleMutation, hashtagMutation, notificationMutation, userMutation, articleQuery, notificationQuery, userQuery)
})
export default schema