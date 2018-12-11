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
    user: User,
    bookmark : [bookmark],
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
type SearchData {
    idArticle:String,
    titleArticle:String
}
extend type Query {
    getArticleById(id: String ): Article
    getArticleByCategory(id  : String ) : Article
    getArticleByHashTag(name : String ) : Article
    getAllArticle(first: Int, offset: Int) : [Article]
    countArticle:Int
    getDataSearch(id: String) : [SearchData]
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