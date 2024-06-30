import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({navItems}) => {
  return (
    <div >
        <div className=" px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col h-[100vh]">

          <ul className="space-y-2 font-medium">
            {
                navItems.map((item,i) => <li key={i}>
                                            <NavLink 
                                             to={item.path}
                                             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{item.name}</NavLink>
                                          </li>)
            }
          </ul>
        </div>
    </div>
  )
}

export default Navbar
