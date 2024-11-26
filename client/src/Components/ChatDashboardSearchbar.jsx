import React, { useState } from 'react'

export default function ChatDashboardSearchbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (

    <div className='relative flex items-center mb-2'>
      <i className="ri-search-line absolute left-9 text-dark-blue"></i>
      <input
        type="text"
        name='searchbar'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='w-full mx-7 rounded-md p-2 ps-8 bg-white outline-none border-2 border-blue-50 hover:border-solid hover:border-2 hover:border-blue-900 focus:border-blue-900'
        placeholder='Search or start new chat'
      />
    </div>
  )
}

