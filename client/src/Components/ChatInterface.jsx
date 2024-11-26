import React from 'react'
import ChatInterfaceHeader from './ChatInterfaceHeader'
import ChatInterfaceBottom from './ChatInterfaceBottom'
import Chat from './Chat'
// import Dashboard from '../Pages/Dashboard'

const ChatInterface = () => {
  return (
    <div className='mt-12'>
      <ChatInterfaceHeader></ChatInterfaceHeader>
      {/* <Dashboard></Dashboard> */}
      <Chat></Chat>
      {/* <ChatInterfaceBottom></ChatInterfaceBottom> */}
    </div>
  )
}

export default ChatInterface;
