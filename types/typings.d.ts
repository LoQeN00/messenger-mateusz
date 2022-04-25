export interface GET_CONVERSATIONS_RESPONSE_TYPE {
  getConversations: Conversation[]
}

export interface Conversation {
  __typename: 'Conversation'
  id: string
  groupMember: GroupMember[]
}

export interface GroupMember {
  __typename: 'GroupMember'
  id: string
  userId: string
  conversationId: string
  user: User
  userId: string
}

export interface User {
  __typename: 'User'
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string
  createdAt: string
  updatedAt: string
  groupsMember: GroupMember[]
}

interface Message {
  __typename: 'Message'
  id: string
  from: string
  text: string
  createdAt: string
  updatedAt: string
  conversationId: string
}
