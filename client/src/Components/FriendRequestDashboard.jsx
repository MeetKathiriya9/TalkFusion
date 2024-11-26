import React from 'react'
import FRHeader from './FRHeader'
import FRChatbox from './FRChatbox'

export default function FriendRequestDashboard() {
    return (
        <div>
           {/* h-[681px] */}
            <div className="bg-blue-200 border-r-dark-blue border-r-2 mt-12 ms-14">
                <FRHeader></FRHeader>
                <FRChatbox></FRChatbox>
            </div>
        </div>
    )
}
