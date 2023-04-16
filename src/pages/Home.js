import React from 'react'
import { useNavigate } from "react-router-dom";


import PictureBackground from '../assets/image/background.png'
import Logo from '../assets/image/Logo.png'
import Bus from '../assets/image/Bus.png'


function Home() {

  const navigate = useNavigate();

  return (
    <div className="bg-Orange-Background h-screen flex flex-col ">
      <div className="container mx-auto text-center  flex flex-col justify-center -mb-12 z-40">
      <div className="mt-20">
        <div className="text-5xl font-bold">WELCOME TO</div>
        <img className="w-60 mx-auto -mt-2 mb-4" src={Logo} alt="Logo"/>
   
        <button onClick={()=>{navigate('/information')}} className="bg-lychee text-black hover:opacity-70 font-bold py-2 px-14 rounded-full ">
          GET STARTED
        </button>
        
      </div>

      
      
    
    </div>

    
    <div className="flex flex-1 items-end">
   
          <img className="min-w-full h-full object-cover " src={PictureBackground} alt="Illustration"/>
          <img className="absolute drop-shadow-[0_45px_65px_rgba(0,0,0,0.80)] z-40 inset-x-0 mx-auto w-3/5 flex justify-center" src={Bus} alt="Illustration"/>
   
    </div>

      
    </div>
  )
}

export default Home