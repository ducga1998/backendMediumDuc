

import { makeExecutableSchema } from 'graphql-tools';
// typedef end
// resolve start
/* MUTATION START */
import articleMutation from './mutation/article';
import hashtagMutation from './mutation/hashtag';
import notificationMutation from './mutation/notification';
import userMutation from './mutation/user';
/* MUTATION END */
/* QUERIES  START */
import articleQuery from './queries/article';
import notificationQuery from './queries/notification';
import userQuery from './queries/user';
import articleType from './types/articleType';
import hashTagType from './types/hashTagType';
import notificationType from './types/notificationType';
//typefdef start
import Root from './types/Root';
import { resolvers, typeDefs } from './types/scalars';
import userType from './types/userType';
const merge = require('lodash/merge')

/* QUERIES END */
// resolve end
const schema = makeExecutableSchema({
    typeDefs: [Root, articleType, hashTagType, notificationType, userType, typeDefs],
    resolvers: merge({}, resolvers, articleMutation, hashtagMutation, notificationMutation, userMutation, articleQuery, notificationQuery, userQuery)
})
export default schema