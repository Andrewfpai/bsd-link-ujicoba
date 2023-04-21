import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";


import PictureBackground from '../assets/image/background.png'
import Logo from '../assets/image/Logo.png'
import Bus from '../assets/image/Bus.png'
import Navbar from '../components/navbar'


function Home() {

  const navigate = useNavigate();
  const [isNavbarClicked, setIsNavbarClicked] = useState(false)

  function sendDataToHome(isClicked){
    setIsNavbarClicked(isClicked)
  
  }

  return (
    <div className="bg-Orange-Background h-screen flex flex-col ">
      <Navbar sendDataToHome={sendDataToHome} />
      <div className="container mx-auto text-center  flex flex-col justify-center -mb-12">
        <div className="mt-20 z-10">
          <div className="text-4xl text-lychee font-semibold -mt-5 mb-5 leading-tight">Route Your <span className='text-darkTeal'>Journey</span><br/>With Ease!</div>
          <button onClick={()=>{navigate('/information')}} className="border border-2 border-darkTeal text-darkTeal hover:opacity-70 mt-2 font-bold py-2 px-10 rounded-full ">
            GET STARTED
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-end z-0">
        <img className="min-w-full h-full object-cover " src={PictureBackground} alt="Illustration"/>
        <img 
          className={isNavbarClicked?
          ("absolute drop-shadow-[0_45px_65px_rgba(0,0,0,0.80)] z-10 inset-x-0 mx-auto w-3/5 flex justify-center translate-x-20 duration-1000 ease-out" ):('absolute drop-shadow-[0_45px_65px_rgba(0,0,0,0.80)] z-10 inset-x-0 mx-auto w-3/5 flex justify-center duration-1000 ease-out')}
          src={Bus} alt="Illustration"/>
      </div>
    </div>
  )
}


export default Home