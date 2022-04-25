import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type Props = {}

const MessageInput = (props: Props) => {
  const CREATE_MESSAGE_MUTATION = gql`
    mutation Mutation($input: createMessageInput!) {
      createMessage(input: $input) {
        id
        userId
        text
        createdAt
      }
    }
  `

  const [inputValue, setInputValue] = useState('')

  const { data: session } = useSession()

  const router = useRouter()

  const [sendMessage, { data, loading, error }] = useMutation(
    CREATE_MESSAGE_MUTATION
  )

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (inputValue === '') return

    const input = {
      userId: session?.user.userId,
      text: inputValue,
      conversationId: router.query.id,
    }

    sendMessage({
      variables: {
        input,
      },
    })

    setInputValue('')
  }

  return (
    <div className="absolute bottom-0 left-0 w-full p-4">
      <form onSubmit={handleSubmit} className="space-x-5">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          className="w-[80%] rounded-lg"
        />
        <button type="submit" className="border px-4 py-2 text-white">
          Wyślij
        </button>
      </form>
    </div>
  )
}

export default MessageInput
