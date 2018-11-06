const userType = /* GraphQL */`
    type User {
        idUser: String
        login: String
        password: String
        decentraliz: Int 
        articles: [String]
        bookMark: [String]
        totalFollow: [String]
        followOtherPeople: [String]
    }
    input UserInput {
        idUser: String
        login: String
        password: String
        decentraliz: Int
    }
    extend type Query {
        getAllInformationUser(id: String):User
    }
    extend type Mutation {
        deleteUserById(id:String): User
        updateInfomationUser(input: UserInput): User
        addNewUser(input: UserInput):User
    }
`
export default userType