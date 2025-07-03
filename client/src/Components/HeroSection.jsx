import React from 'react'
import image from '/assets/Hero Background.png'
import logo from '/assets/Brand_Assets/Text Mark.png'
import preview from '/assets/Preview.png'
import { Link } from 'react-router-dom'
const HeroSection = () => {
    return (
        <div className='block relative box-border w-screen overflow-hidden bg-black pb-20 px-5 sm:px-10 md:px-30'>
            <img src={image} alt="Hero Section Background Image" className='block absolute h-full w-full object-cover top-0 left-0' />
            <div className='block absolute h-full w-full bg-gradient-to-b top-0 left-0 from-black to-transparent'></div>
            <img src={logo} alt='logo' className='block relative sm:mx-auto h-5 sm:h-8 mt-10 sm:mt-30'/>
            <h1 className='block relative text-3xl sm:text-4xl md:text-5xl text-white text-left sm:text-center mt-8' style={{ fontFamily: "Audiowide" }}>Write Confidently with Smart Code Analysis and Instant AI Feedback.</h1>
            <p className='block relative text-[11px] md:text-sm text-white text-left sm:text-center mt-5 sm:left-1/2 sm:-translate-x-1/2 w-[100%] md:w-[80%]'>Our AI-powered code reviewer helps you maintain high-quality code, reduce technical debt, and boost your productivity — whether you're working solo or with a team.</p>
            <div className='flex justify-start sm:justify-center items-center h-10 mt-8 gap-3'>
                <Link to='/app/codereview' className='flex justify-center items-center relative h-full rounded-md bg-gray-900 text-[10px] sm:text-sm border border-gray-600 cursor-pointer hover:bg-gray-800 duration-150 text-white px-5'>Launch Code Reviewer</Link>
                <a href='www.linkedin.com/in/yaseenthemernstackdeveloper' target='_blank' className='flex justify-center items-center relative h-full rounded-md bg-white text-black text-[10px] sm:text-sm px-5 hover:bg-gray-200 duration-150 cursor-pointer'>About Developer</a>
            </div>
            <img src={preview} className='block relative w-[100%] md:w-[90%] lg:w-[80%] mx-auto mt-10 sm:mt-30 rounded-lg sm:rounded-3xl border-2 sm:border-3 border-gray-300' alt='Screenshot'></img>
        </div>
    )
}

export default HeroSection
