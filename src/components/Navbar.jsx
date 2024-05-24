import React, { useState} from 'react'
import { Link } from 'react-router-dom';

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo , menu , close } from "../assets";


const Navbar = () => {

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);


  return (
    <nav className={`${styles.paddingX} w-4/5 mt-5 flex flex-col items-center py-5 fixed top-0 z-20 bg-whiteCardOverlay backdrop-blur-lg rounded-full`}>
      <div className='w-full flex justify-between items-center max-w-7xl'>
        <Link 
        to='/' 
        className='flex items-center gap-2 ' 
        onClick={() => {
          setActive("");
          window.scrollTo(0, 0);
        }}
        > 
        <img src={logo} alt="logo" className='w-10 h-10 object-contain hover:resize-x-10 hover:resize-y-10 hover:scale-150 transition-all duration-300 ease-in-out '/>
        <p className='text-black text-[18px] font-bold cursor-pointer'>Riyajath Ahamed</p>

        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {
            navLinks.map( (Link) => (

              <li
              key={Link.id}
              className ={`${active === Link.title ? "text-yellow-500 font-bold" : "text-black"} hover:font-bold text-[18px] cursor-pointer font-medium  p-1`}
              onClick={() => setActive(Link.title)}
              
              >
                <a href={`#${Link.id}`}>{Link.title}</a>
              </li>

            ))
          }

        </ul>


        {/* Mobile View */}
        <div className='sm:hidden flex flex-1 justify-end items-center '>
          <img 
          src={toggle ? close : menu} 
          alt="menu" 
          className='w-[28px] h-[28px] object-contain cursor-pointer invert'
          onClick={() => setToggle(!toggle)}
          />
          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-whiteCardOverlay backdrop-blur-xl w-full h-44 absolute top-14 right-0 mx-4 my-2 min-w-[104px] z-10 rounded-xl  `}>

          <ul className='list-none flex justify-end items-start flex-col gap-4'>
          {
            navLinks.map( (Link) => (

              <li
              key={Link.id}
              className ={`${active === Link.title ? "text-yellow-500 " : "text-tertiary"} font-poppins font-semibold cursor-pointer text-[16px]`}
              onClick={() => {
                setToggle(!toggle);
                setActive(Link.title);
              }}
              
              >
                <a href={`#${Link.id}`}>{Link.title}</a>
              </li>

            ))
          }

        </ul>

          </div>
          
        </div>

      </div>

    </nav>
  )
}

export default Navbar