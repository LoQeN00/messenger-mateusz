import React from 'react'
import Contacts from '../../components/Contacts'
import Navbar from '../../components/Navbar'
import Chat from '../../components/Chat'

type Props = {}

const ConversationPage = (props: Props) => {
  return (
    <div className="flex h-[100vh] flex-col bg-[#242526]">
      <Navbar />
      <div className="flex overflow-hidden">
        <Contacts />
        <Chat />
      </div>
    </div>
  )
}

export default ConversationPage
