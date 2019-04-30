const hashTag = /* GraphQL */`
    type HashTagType  {
        idArticle: String
        idHashTag : String
        nameHashTag :String
    
    }
    extend type Query {
        getHashTagByIdHashTag(id:String) : [HashTagType]
        getHashTagAll:[HashTagType]
    }
`
export default hashTag