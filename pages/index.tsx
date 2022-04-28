import type { NextPage, GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Contacts from '../components/Contacts'
import Navbar from '../components/Navbar'
import Invites from '../components/Invites'
import FriendCode from '../components/FriendCode'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-[100vh] flex-col bg-[#242526]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Contacts />
        <div className=" w-[80%]">
          <Invites />
          <FriendCode />
        </div>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
