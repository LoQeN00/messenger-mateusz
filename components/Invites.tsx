import React, { useEffect, useState } from 'react'
import { useQuery, gql, useSubscription } from '@apollo/client'
import { useSession } from 'next-auth/react'
import AddFriend from './addFriend'

import Invite from './Invite'

type Props = {}

const Invites = (props: Props) => {
  const { data: session } = useSession()

  const [invites, setInvites] = useState<any>([])

  const GET_INVITES_QUERY = gql`
    query GetInvites($userId: String!) {
      getInvites(userId: $userId) {
        id
        sender {
          name
          image
        }
        senderId
      }
    }
  `

  const INVITES_SUBSCRIPTON = gql`
    subscription Subscription {
      inviteSended {
        id
        senderId
        receiverId
        sender {
          name
          image
        }
      }
    }
  `

  const { data, error, loading } = useQuery(GET_INVITES_QUERY, {
    variables: {
      userId: session?.user.userId,
    },
    onCompleted(data) {
      setInvites(data.getInvites)
    },
  })

  const { data: subData, loading: subLoading } =
    useSubscription(INVITES_SUBSCRIPTON)

  useEffect(() => {
    if (!subData) return
    if (subData?.inviteSended.receiverId !== session?.user.userId) return

    setInvites([...invites, subData?.inviteSended])
  }, [subData])

  return (
    <div className="w-[70%] space-y-5 p-5">
      <h1 className="text-2xl font-bold text-[#e4e6eb]">
        Twoje zaproszenia do znajomych:
      </h1>
      {invites.map((invite: any) => (
        <Invite key={invite.id} invite={invite} setInvites={setInvites} />
      ))}
      <AddFriend />
    </div>
  )
}

export default Invites
