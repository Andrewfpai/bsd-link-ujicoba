import '../App.css';
import Logo from '../assets/image/Logo.png'
import iconMenu from '../assets/icon/hamburger.png'
import iconMenuClose from '../assets/icon/cancel.png'
import {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"



function Navbar({sendDataToHome}) {

  const navigate = useNavigate();

  const [isToggleActive, setIsToggleActive] = useState(false)

    function handleClick(state){
        setIsToggleActive(state)
        sendDataToHome(state)
    }

  return (
    
    <div className="z-50">
    
    <div className="flex flex-row items-center justify-between pt-5 pb-4">
        <img src={Logo} alt='logo' className='w-44 cursor-pointer ml-5 desktop:w-72' onClick={()=>{navigate('/')}} />
        <ul className="hidden desktop:flex desktop:text-3xl desktop:mr-20 desktop:gap-20 flex-row justify-center gap-10 text-darkGrayishBlue items-center">
            <div className='bg-teal w-72 rounded-lg text-center px-2 py-1'>
                <Link to={'/search'} className=' hover:underline text-lychee cursor-pointer font-semibold desktop:font-medium'>SEARCH ROUTE</Link>
            </div>
            
            <Link to={'/aboutBSDLink'} className='hover:text-lychee hover:underline cursor-pointer'>About BSD Link</Link>
            <Link to={'/aboutUs'} className='hover:text-lychee hover:underline cursor-pointer'>About Us</Link>
        </ul>
        <div className='block desktop:hidden' onClick={()=>{handleClick(true)}}>
          <img src={iconMenu} alt='menu' className="w-7 mr-6"/>
        </div>

        {/* Background Menu */}
        <div className={isToggleActive?'fixed w-full h-full top-0 right-0 opacity-60 bg-black ':'hidden'}></div> 
    </div>
    
    <div>

    

        {/* Sidebar Menu */}
        
        <div className={isToggleActive?'fixed top-0 -right-20 w-64 h-full bg-teal transition transform -translate-x-20 duration-500 ease-out':'fixed top-0 -right-60 w-64 h-full bg-teal  transition transform translate-x-20 duration-1000 ease-out desktop:hidden'}>
         
          <img className='w-8 fixed top-10 ml-48' onClick={()=>{handleClick(false)}} src={iconMenuClose} alt='menu' />
          {isToggleActive && (
            <AnimatePresence>
            <motion.nav
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, duration: 1.5, delay:0.3, damping:20}}
            >
              <ul className="grid gap-5 font-Inter text-left text-lg ml-8 mt-28">
                <div className='bg-yellow w-40 rounded-lg -ml-2 px-2 py-1'>
                  <Link to={'/search'} className='hover:text-softRed underline cursor-pointer font-semibold'>SEARCH ROUTE</Link>
                </div>
                <Link to={'/'} className='hover:text-softRed cursor-pointer underline'>Home</Link>
                <Link to={'/aboutBSDLink'} className='hover:text-softRed cursor-pointer underline'>About BSD Link</Link>
                <Link to={'/aboutUs'} className='hover:text-softRed cursor-pointer underline'>About Us</Link>
              </ul>
            </motion.nav>
            </AnimatePresence>
          )}
        </div>
    </div>
    </div>
   
  );
}

export default Navbar;
