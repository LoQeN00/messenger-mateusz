import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useSession } from 'next-auth/react'

type Props = {}

const AddFriend = (props: Props) => {
  const SEND_INVITE_MUTATION = gql`
    mutation Mutation($input: sendInviteInput!) {
      sendInvite(input: $input) {
        id
        senderId
        receiverId
      }
    }
  `
  const { data: session } = useSession()

  const [inputValue, setInputValue] = useState('')

  const [sendInvite, { data, loading, error }] =
    useMutation(SEND_INVITE_MUTATION)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (inputValue === session?.user.userId) {
      setInputValue('')
      alert('Nie mozesz wyslac zaproszenia do siebie')
      return
    }

    const input = {
      senderId: session?.user.userId,
      receiverId: inputValue,
    }

    sendInvite({
      variables: {
        input,
      },
    })

    setInputValue('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-x-5">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <button
          type="submit"
          className="rounded-lg border border-white px-2 py-2 text-white"
        >
          Dodaj zioma
        </button>
      </form>
    </div>
  )
}

export default AddFriend
