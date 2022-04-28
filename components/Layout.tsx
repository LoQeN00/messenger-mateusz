import React, { FC } from 'react'
import Navbar from './Navbar'
import Contacts from './Contacts'

const Layout: FC = ({ children }) => {
  return (
    <div className="flex min-h-[100vh] flex-col bg-[#242526]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Contacts />
        <div className=" w-[80%]">{children}</div>
      </div>
    </div>
  )
}

export default Layout
