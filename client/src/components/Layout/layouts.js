import React from 'react'
import Header from './Header'
import Footer from './footer'
const layouts = ({children}) => {
  return (
    <>
        <Header/>

        <div className='content'>
                {children}
        </div>

        <Footer/>
    
    </>
  )
}

export default layouts