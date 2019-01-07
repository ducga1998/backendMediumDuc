const notificationType = /* GraphQL */ `
  type Notification {
      idNotification: String
      idUser: String
      type:String
      notificationData:JSON
      time : String
  }

  extend type Query {
        getAllNotifiOfArticle(id: String):Notification 
        getAllNotifiOfUser(id: String): [Notification]
  }
`

export default notificationType;