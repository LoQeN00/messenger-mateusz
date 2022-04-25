import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    emailVerified: Boolean
    image: String
    createdAt: String
    updatedAt: String
    groupsMember: [GroupMember]
  }

  type Subscription {
    messageCreated: Message
  }

  type Query {
    users: [User]!
    user(id: String): User
    getConversations(userId: String): [Conversation]
    getConversation(conversationId: String): Conversation
  }

  type Mutation {
    createMessage(input: createMessageInput!): Message
  }

  type Conversation {
    id: String
    name: String
    groupMember: [GroupMember]
    messages: [Message]
  }

  type GroupMember {
    id: String
    userId: String
    conversationId: String
    user: User
  }

  type Message {
    id: String
    userId: String
    user: User
    text: String
    createdAt: String
    updatedAt: String
    conversationId: String
  }

  input createMessageInput {
    userId: String!
    text: String!
    conversationId: String!
  }
`
