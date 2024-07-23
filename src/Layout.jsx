import React from 'react'
import Header from '../src/components/common/Header/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/common/Footer/Footer'

const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet />
    <Footer />
    
    
    </>
  )
}

export default Layout