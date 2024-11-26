import React from 'react'
import NFTHeader from './NFTHeader'
import NTFList from './NTFList'

export default function NFTDashboard() {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/3 h-full bg-blue-200 ">
                <div>
                    <div className="bg-blue-200 border-r-dark-blue border-r-2 mt-12 ms-14">
                        <NFTHeader></NFTHeader>
                        <NTFList></NTFList>
                    </div>
                </div>
            </div>
            <div className="w-2/3 h-full bg-blue-100">
            </div>
        </div>
    )
}
