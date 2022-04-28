import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

type Props = {}

const FriendCode = (props: Props) => {
  const { data: session } = useSession()

  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(session?.user.userId!)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <button
      className="m-5 rounded-lg border border-white px-2 py-4 text-white"
      onClick={handleClick}
    >
      {copied ? 'Skopiowany!' : 'Kliknij aby skopiować swój kod'}
    </button>
  )
}

export default FriendCode
