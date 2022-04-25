import React from 'react'
import { useQuery, gql, useSubscription } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Message from '../components/Message'
import MessageInput from '../components/MessageInput'

type Props = {}

const Chat = (props: Props) => {
  const { data: session } = useSession()

  const GET_MESSAGES_QUERY = gql`
    query GetConversation($conversationId: String) {
      getConversation(conversationId: $conversationId) {
        messages {
          text
          user {
            image
            id
          }
          id
          createdAt
        }
        id
        groupMember {
          user {
            name
            image
          }
          userId
        }
      }
    }
  `

  const MESSAGES_SUBSCRIPTION = gql`
    subscription Subscription {
      messageCreated {
        id
        userId
        text
        createdAt
      }
    }
  `

  const router = useRouter()

  const { loading, error, data } = useQuery(GET_MESSAGES_QUERY, {
    variables: {
      conversationId: router.query.id,
    },
  })

  const { data: subData, loading: subLoading } = useSubscription(
    MESSAGES_SUBSCRIPTION
  )

  const contactData = data?.getConversation.groupMember.filter(
    (member: any) => member.userId != session?.user.userId
  )

  if (loading) return null

  if (!contactData) return null

  console.log(data)

  console.log(subData)

  return (
    <div className="relative w-[80%] p-5">
      <div className="mb-20 flex items-center space-x-5">
        <div className="min-w-12 min-h-12 relative h-12 w-12">
          <Image
            src={contactData[0].user.image}
            layout="fill"
            className="rounded-full"
          />
        </div>
        <p className="hidden text-lg text-[#e4e6eb] md:block">
          {contactData[0].user.name}
        </p>
      </div>
      <div className="space-y-10">
        {data.getConversation.messages.map((message: any) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default Chat
