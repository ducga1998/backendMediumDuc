const userType = /* GraphQL */`
    type User {
        idUser: String
        login: String
        password: String
        decentraliz: Int 
        name: String
        avatarLink: String
        # articles: [Article]
        bookMark: [String]
        totalFollow: [String]
        followOtherPeople: [String]
        articles : [Article]
        biographical: String
        birthday: String
        location: String
    }
    input UserInput {
        idUser: String
        login: String
        password: String
        decentraliz: Int
        name: String
        avatarLink: String
    }
    extend type Query {
        getAllInformationUser(id: String):User
        checklogin(username:String,password:String) : User 
        logout(id: String) : User
    }
    extend type Mutation {
        deleteUserById(id:String): User
        updateInfomationUser(input: UserInput): User
        addNewUser(input: UserInput):User
    }
`
export default userType