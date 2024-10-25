import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import "./style.css"

export default function Layout() {
  return (
    <main>
      <Header/>   
      <Outlet/>
    </main>
  )
}
