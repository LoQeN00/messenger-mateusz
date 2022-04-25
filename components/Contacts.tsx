import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Contact from './Contact'
import { Conversation } from '../types/typings'
import { useSession } from 'next-auth/react'

type Props = {}

const Contacts = (props: Props) => {
  const { data: session } = useSession()

  const CONVERSATIONS_QUERY = gql`
    query Query($userId: String) {
      getConversations(userId: $userId) {
        id
        name
        groupMember {
          id
          userId
          conversationId
          user {
            name
            image
          }
        }
      }
    }
  `

  const { loading, error, data } = useQuery(CONVERSATIONS_QUERY, {
    variables: {
      userId: session?.user.userId,
    },
  })

  if (loading) return null

  return (
    <div className="h-[100vh] w-[20%] space-y-5 border-r border-[#393a3b] p-5">
      <p className="text-3xl font-bold text-[#e4e6eb]">Contacts</p>
      <div className="max-h-[95%] space-y-10  overflow-y-scroll scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900">
        {data?.getConversations.map((conversation: Conversation) => (
          <Contact key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  )
}

export default Contacts
