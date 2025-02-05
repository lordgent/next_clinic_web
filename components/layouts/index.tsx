import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

interface LayoutInterface {
  children: React.ReactNode
}

const Layout:React.FC<LayoutInterface> = ({children}) => {
  return (
    <>
    <Navbar/>
    <div className="container flex flex-col mx-auto p-4 w-full h-full justify-center">
        <div className='w-full max-w-[1200px] mx-auto '>
        {children} 
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Layout;