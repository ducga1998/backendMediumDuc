const articleType = /* GraphQL */ `
type  Article {
    idUser: String,
    idArticle: String,
    hashTag: [String],
    category: [String],
    comment:[Comment],
    totalClap: Int,
    notification: String,
    contentArticle : String , 
    titleArticle : String ,
    imageArticle : String,
    createTime : String,
    user: User
}
input ArticleInput {
    idUser: String,
    idArticle : String,
    hashTag: [String],
    category: [String],
    totalClap: Int,
    notification: String,
    contentArticle : String ,
    titleArticle : String ,
    imageArticle: String,
    createTime : String
}
extend type Query {
    getArticleById(id: String ): Article
    getArticleByCategory(id  : String ) : Article
    getArticleByHashTag(name : String ) : Article
    getAllArticle(id : String ,first : Int) : [Article]
}
input DeleteInput {
    idArticle:String
    idUser: String
}
extend type Mutation {
    addArticle(input : ArticleInput ) : Article
    deleteArtice(input :DeleteInput) : Article
    updateArticle(input : ArticleInput) : Article
}
`
export default articleType;