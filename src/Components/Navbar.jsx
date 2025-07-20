import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-purple-200 	text-purple-900 items-center px-5 py-1'>
    <div className="logo mx-10 my-2">
        <span className='font-semibold text-xl'>iTask</span>
    </div>
    <ul className='flex gap-10 mx-10 my-2'>
        <li className='cursor-pointer hover:font-semibold transition-all '>Home</li>
        <li className='cursor-pointer hover:font-semibold transition-all '>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default Navbar
