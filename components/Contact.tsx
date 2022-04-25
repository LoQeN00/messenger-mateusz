import React from 'react'
import { Conversation } from '../types/typings'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

type Props = {
  conversation: Conversation
}

const Contact = ({ conversation }: Props) => {
  const { data: session } = useSession()

  const contactData = conversation.groupMember.filter(
    (member) => member.userId != session?.user.userId
  )

  console.log(contactData)

  if (!contactData.length) return null

  return (
    <Link href={`/conversation/${conversation.id}`}>
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
