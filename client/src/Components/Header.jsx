import React from 'react'
import '../assets/css/Header.css'
import FixHead from './FixHead'
import VerticalMenu from './VerticalMenu'
import { useLocation } from 'react-router-dom'


export default function Header() {

  const location = useLocation();

  const noVerticalMenuRoutes = ['/', '/register'];

  return (
    <>
      <FixHead></FixHead>
      {/* <VerticalMenu></VerticalMenu> */}
      {!noVerticalMenuRoutes.includes(location.pathname) && <VerticalMenu />}

    </>
  )
}
