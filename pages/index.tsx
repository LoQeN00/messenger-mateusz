import type { NextPage, GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Contacts from '../components/Contacts'
import Navbar from '../components/Navbar'
import Invites from '../components/Invites'
import FriendCode from '../components/FriendCode'

const Home: NextPage = () => {
  return (
    <>
      <Invites />
      <FriendCode />
    </>
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
