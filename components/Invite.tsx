import React from 'react'
import Image from 'next/image'
import { useMutation, gql } from '@apollo/client'

type Props = {
  invite: any
}

const Invite = ({ invite }: Props) => {
  const DENY_INVITE_MUTATION = gql`
    mutation Mutation($denyInviteId: String) {
      denyInvite(id: $denyInviteId) {
        id
        senderId
        receiverId
      }
    }
  `

  const ACCEPT_INVITE_MUTATION = gql`
    mutation Mutation($acceptInviteId: String) {
      acceptInvite(id: $acceptInviteId) {
        message
      }
    }
  `
  const [denyInvite] = useMutation(DENY_INVITE_MUTATION)

  const [acceptInvite, { data, loading, error }] = useMutation(
    ACCEPT_INVITE_MUTATION
  )

  return (
    <div>
      <div className="flex items-center space-x-5">
        <h2 className="text-xl text-white">{invite.sender.name}</h2>
        <div className="min-w-12 min-h-12 relative h-12 w-12">
          <Image
            src={invite.sender.image}
            layout="fill"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="my-5 flex space-x-5">
        <button
          className="rounded-lg border border-green-500 px-4 py-2 text-white"
          onClick={() =>
            acceptInvite({ variables: { acceptInviteId: invite.id } })
          }
        >
          Akceptuj
        </button>
        <button
          className="rounded-lg border border-red-500 px-4 py-2 text-white"
          onClick={() => denyInvite({ variables: { denyInviteId: invite.id } })}
        >
          Odrzuć
        </button>
      </div>
    </div>
  )
}

export default Invite
