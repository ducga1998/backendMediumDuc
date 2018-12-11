const comment = /* GraphQL */`
    type Comment  {
        idUser: String
        idArticle: String
        content: String
        totalLike: Int
        userComment: User
        articleComment: Article
        createdAt :String
        idComment : String
        relyComment:[Rely]
    }
    input CommentInput {
        idUser: String
        idArticle: String
        content: String
    }
    extend type Mutation {
        addCommentIntoArticle(input: CommentInput) :Comment
    }
    extend type Query {
        getAllCommentInTheArticle(id:String) : [Comment]
    }
`
export default comment