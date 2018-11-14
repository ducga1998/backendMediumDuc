const articleType = /* GraphQL */ `
type  Article {
    idUser: String,
    idArticle: String,
    hashTag: [String],
    category: [String],
    comment: [String],
    totalClap: Int,
    notification: String,
    contentArticle : String , 
    titleArticle : String 
}
input ArticleInput {
    idUser: String,
    hashTag: [String],
    category: [String],
    comment: [String],
    totalClap: Int,
    notification: String,
    contentArticle : String , 
    titleArticle : String 
}
extend type Query {
    getArticleById(id: String): Article
    getArticleByCategory(id  : String ) : Article
    getArticleByHashTag(name : String ) : Article
    
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