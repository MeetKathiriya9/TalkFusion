import React from 'react'

import logo from '../assets/image/app_logo.png'
import VerticalMenu from './VerticalMenu'

export default function FixHead() {
  return (
    <div className="fix-head w-full bg-dark-blue fixed top-0">
      <div className=' flex items-center p-2'>
        <img src={logo} alt="logo" className=' w-10'/>
        <p className=' text-white text-lg font-bold ps-3'>TalkFusion</p>
      </div>
    </div>
  )
}
  