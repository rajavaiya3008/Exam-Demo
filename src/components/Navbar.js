import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({navItems}) => {
  return (
    <div>
        <div className='flex flex-col'>
            {
                navItems.map((item,i) => <NavLink to={item.path} key={i}>{item.name}</NavLink>)
            }
        </div>
    </div>
  )
}

export default Navbar
