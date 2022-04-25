import type { NextPage, GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Contacts from '../components/Contacts'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div className="min-h-[100vh]  bg-[#242526]">
      <Navbar />
      <div className="flex overflow-hidden">
        <Contacts />
        <div className="w-[70%]"></div>
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
