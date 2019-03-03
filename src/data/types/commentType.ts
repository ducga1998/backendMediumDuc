const comment = /* GraphQL */`
    type Comment  {
        idUser: String
        idArticle: String
        content: String
        totalLike: Int
        userComment: User
        articleComment: Article
        createdAt :Date
        idComment : String
        idRely  : String # id rely la idComment dc reply : ))))) 
    }
    input CommentInput {
        idUser: String
        idArticle: String
        content: String
        idRely:String
        idComment: String
    }
    extend type Mutation {
        addCommentIntoArticle(input: CommentInput) :Comment
    }
    extend type Query {
        getAllCommentInTheArticle(id:String ,first:Int , offset: Int ) : [Comment]
    }
`
export default comment