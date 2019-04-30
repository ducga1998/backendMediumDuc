const hashTag = /* GraphQL */`
    type HashTagType  {
        idArticle: String
        idHashTag : String
        nameHashTag :String
    
    }
    extend type Query {
        getArticleTagByNameHashTag(id:String) : [Article]
        getHashTagAll:[HashTagType]
    }
`
export default hashTag