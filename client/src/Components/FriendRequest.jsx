import React from 'react'
import FriendRequestDashboard from "./FriendRequestDashboard";

export default function FriendRequest() {

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/3 h-full bg-blue-200 ">
                <FriendRequestDashboard />
            </div>
            <div className="w-2/3 h-full bg-blue-100">
                {/* <ChatInterface /> */}
            </div>
        </div>
    )
}
