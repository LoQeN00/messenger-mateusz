import React, { useState, useEffect } from 'react'
import { useQuery, gql, useSubscription } from '@apollo/client'
import Contact from './Contact'
import { Conversation } from '../types/typings'
import { useSession } from 'next-auth/react'

type Props = {}

const Contacts = (props: Props) => {
  const { data: session } = useSession()

  const [contacts, setContacts] = useState<any>([])

  const CONVERSATIONS_QUERY = gql`
    query Query($userId: String!) {
      getConversations(userId: $userId) {
        id
        conversationId
      }
    }
  `

  const CONVERSATIONS_SUBSCRIPTION = gql`
    subscription Subscription($userId: String) {
      conversationAdded(userId: $userId) {
        id
        name
        groupMember {
          userId
          conversationId
          id
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
    onCompleted(data) {
      setContacts(data.getConversations)
    },
  })

  const { data: subData, loading: subLoading } = useSubscription(
    CONVERSATIONS_SUBSCRIPTION,
    {
      variables: {
        userId: session?.user.userId,
      },
    }
  )

  useEffect(() => {
    if (!subData) return

    console.log(subData)

    const data = {
      id: subData.conversationAdded[0].id,
      conversationId: subData.conversationAdded[0].id,
    }

    setContacts([...contacts, data])
  }, [subData])

  if (loading) return null

  return (
    <div className="height-[100%]  w-[20%] space-y-5 border-r border-[#393a3b] p-5">
      <p className="text-3xl font-bold text-[#e4e6eb]">Contacts</p>
      <div className="max-h-[95%] space-y-10  overflow-y-scroll scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900">
        {contacts.map((conversation: Conversation) => (
          <Contact key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  )
}

export default Contacts
