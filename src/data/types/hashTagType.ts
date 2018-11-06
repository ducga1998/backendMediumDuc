const hashTag = /* GraphQL */`
    type HashTag  {
        idtag: String
        name: String
    }
    input HashTagInput {
        idtag: String
        name: String
    } 
    extend type Mutation {
        addHashtag(input:HashTagInput ): HashTag
        deleteHashTag(id:String):HashTag
    }
`
export default hashTag