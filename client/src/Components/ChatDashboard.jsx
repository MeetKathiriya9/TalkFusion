import React from 'react'
import ChatDashboardHeader from './ChatDashboardHeader'
import ChatInterface from './ChatInterface'
// import ChatDashboardSearchbar from './ChatDashboardSearchbar'
import ChatDashboardChatbox from './ChatDashboardChatbox'

const ChatDashboard = () => {
  return (

    // h-[681px]
    <div className="bg-blue-200 border-r-dark-blue border-r-2 mt-12 ms-14">
      <ChatDashboardHeader></ChatDashboardHeader>
      {/* <ChatDashboardSearchbar></ChatDashboardSearchbar> */}
      <ChatDashboardChatbox></ChatDashboardChatbox>
    </div>
  )
}


export default ChatDashboard