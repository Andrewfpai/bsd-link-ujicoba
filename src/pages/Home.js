import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from '../components/pageTransition'



import PictureBackground from '../assets/image/background.png'
import Logo from '../assets/image/Logo.png'
import Bus from '../assets/image/Bus.png'
import Navbar from '../components/navbar'

const animationConfiguration = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function Home() {

  const navigate = useNavigate();
  const [isNavbarClicked, setIsNavbarClicked] = useState(false)

  function sendDataToHome(isClicked){
    setIsNavbarClicked(isClicked)
  
  }

  return (
    <PageTransition className="">
    <div className="bg-Orange-Background h-screen flex flex-col ">
      <Navbar sendDataToHome={sendDataToHome} />
      <div className="container mx-auto text-center  flex flex-col justify-center -mb-12 desktop:-mb-32">
        <div className="mt-20 z-10 desktop:mt-32">
        <motion.nav
          initial={{ y: 100, opacity:0 }}
          animate={{ y: 0, opacity:1}}
          transition={{ type: "spring", stiffness: 100, duration: 1.5, delay:0.5}}
        >

          <div className="text-4xl text-lychee font-semibold -mt-5 mb-5 leading-tight desktop:text-[7rem] desktop:font-bold">Route Your <span className='text-darkTeal'>Journey</span><br className="block desktop:hidden"/> With Ease!</div>
          
          
          <button onClick={()=>{navigate('/information')}} 
          className="border border-2 border-darkTeal text-lychee bg-darkTeal hover:bg-transparent hover:text-darkTeal mt-2 font-bold py-2 px-10 rounded-full desktop:py-3 desktop:px-16 desktop:text-2xl">
            GET STARTED
          </button>
        </motion.nav>
        </div>
      </div>
      <div className="flex flex-1 items-end z-0">
        <img className="min-w-full h-full object-cover " src={PictureBackground} alt="Illustration"/>
        <img 
          className={isNavbarClicked?
          ("absolute drop-shadow-[0_45px_65px_rgba(0,0,0,0.80)] z-10 inset-x-0 mx-auto w-3/5 flex justify-center translate-x-20 duration-1000 ease-out desktop:w-2/4" ):('absolute drop-shadow-[0_45px_65px_rgba(0,0,0,0.80)] z-10 inset-x-0 mx-auto w-3/5 flex justify-center duration-1000 ease-out')}
          src={Bus} alt="Illustration"/>
      </div>
    </div>
</PageTransition>
  )
}


export default Home