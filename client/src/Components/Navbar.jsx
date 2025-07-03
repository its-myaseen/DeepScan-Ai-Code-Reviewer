import React from 'react'
import logo from '/assets/Brand_Assets/Text Mark.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center px-5 sm:px-10 relative h-15 sm:h-20 w-full bg-transparent z-100'>
            <Link to='/'>   <img src={logo} alt='Logo' className='block relative h-5 sm:h-8' /> </Link>

        </div>
    )
}

export default Navbar