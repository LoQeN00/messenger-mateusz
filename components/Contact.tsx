import React from 'react'
import { Conversation } from '../types/typings'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useQuery, gql } from '@apollo/client'

type Props = {
  conversation: any
}

const Contact = ({ conversation }: Props) => {
  const { data: session } = useSession()

  const GET_CONVERSATION = gql`
    query GetConversation($conversationId: String) {
      getConversation(conversationId: $conversationId) {
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

  const { loading, error, data } = useQuery(GET_CONVERSATION, {
    variables: {
      conversationId: conversation.conversationId,
    },
  })

  const contactData = data?.getConversation.groupMember.filter(
    (member: any) => member.userId != session?.user.userId
  )

  if (!contactData) return null

  return (
    <Link href={`/conversation/${conversation.conversationId}`}>
      <div className="ease flex cursor-pointer items-center space-x-7 rounded-lg p-4 transition-all hover:bg-[#3a3b3c]">
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
    </Link>
  )
}

export default Contact
