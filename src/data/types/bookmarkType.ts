
const bookmarkType = /* GraphQL */`
    type bookmark  {
        idUser: String
        idArticle: String
        idUserBookMark: String
        userBookMark:User 
        userOwnArticle: User
        articleBookMark: Article
    }





    input bookmarkInput {
        idUser: String
        idArticle: String
        idUserBookMark: String
    }
    extend type Mutation {
        bookMark(input: bookmarkInput) :bookmark
        unBookMark(input: bookmarkInput): bookmark
    }
    extend type Query {
        getAllArticleHasBeenBookMark(idUser: String):[bookmark]
        isBookMark(idUserBookMark:String , idArticle:String):Boolean
    }
`



export default bookmarkType