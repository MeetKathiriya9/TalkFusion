import React from 'react'
import Header from './Header'
import Routers from '../Routers/Routers'

export default function Layout() {
  return (
    <>

      <Header></Header>

      <div>
        <Routers></Routers>
      </div>
    </>
  )
}
