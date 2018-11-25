const notificationType = /* GraphQL */ `
  type Notification {
      idNotification: String
      idArticle: String
      idUser: String
      contentNotification: String
  }

  input NotificationInput {
    idNotification: String
    idArticle: String
    idUser: String
    contentNotification: String
  }

  extend type Query {
        getAllNotifiOfArticle(id: String):Notification 
        getAllNotifiOfUser(id: String): Notification
  }
  extend type Mutation {
    addNotification(input:NotificationInput):Notification
  }
`

export default notificationType;