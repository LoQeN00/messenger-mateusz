import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

type Props = {}

const Navbar = (props: Props) => {
  const { data: session, status } = useSession()

  return (
    <div className="flex items-center justify-between border-b border-[#393a3b] p-5">
      <div className="flex items-center space-x-2">
        <p className="text-xl font-bold text-[#e4e6eb]">{session?.user.name}</p>
        <div className="relative h-12 w-12">
          {session?.user.image && (
            <Image
              src={session?.user.image}
              layout="fill"
              className="rounded-full"
            />
          )}
        </div>
      </div>
      <div>
        <button
          className="ease rounded-md border border-[#e4e6eb] py-2 px-4 text-lg font-bold text-[#e4e6eb] transition-all hover:bg-[#e4e6eb] hover:text-[#393a3b]"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Navbar
