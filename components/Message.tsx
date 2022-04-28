import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
  message: any
}

const Message = ({ message }: Props) => {
  const { data: session, status } = useSession()

  return (
    <div
      className={`flex ${
        session?.user.userId === message.user.id
          ? `justify-start`
          : `mr-5 justify-end`
      }`}
    >
      <div className="flex items-end space-x-5">
        <div className="min-w-12 min-h-12 relative h-12 w-12">
          <Image
            src={message.user.image}
            layout="fill"
            className="rounded-full"
          />
        </div>
        <div className="max-w-[250px] break-words rounded-lg bg-[#e4e6eb] p-4">
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
