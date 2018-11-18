const comment = /* GraphQL */`
    type Comment  {
        idUser: String
        idUserFollow: String
        userComment: User
        articleComment : Article
    }
    input CommentInput {
        idUser: String
        idUserFollow: String
    }
    extend type Mutation {
       
    }
    extend type Query {
        getAllInfomationUserFollowYour(idUser:String) : Follow
    }
`
export default comment