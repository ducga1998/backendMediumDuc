const hashTag = /* GraphQL */`
    type HashTag  {
        idtag: String
        name: String
        idArticle : String
        articlesSameHashTag : [Article]
    }
    input HashTagInput {
        idtag: String
        name: String
        idArticle:String
    } 
    extend type Mutation {
        addHashtag(input:HashTagInput ): HashTag
        deleteHashTag(id:String):HashTag
    }
    extend type Query {
        getAllAricleByIdArticle(id : String) :HashTag
    }
`
export default hashTag