import React from 'react'
import Contacts from '../../components/Contacts'
import Navbar from '../../components/Navbar'
import Chat from '../../components/Chat'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

type Props = {}

const ConversationPage = (props: Props) => {
  return (
    <div className="flex min-h-[100vh] flex-col bg-[#242526]">
      <Navbar />
      <div className="flex overflow-hidden">
        <Contacts />
        <Chat />
      </div>
    </div>
  )
}

export default ConversationPage

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
