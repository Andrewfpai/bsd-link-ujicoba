import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import BackIcon from '../assets/icon/angle-small-left.png'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar'
import { motion } from "framer-motion";



function CardInfo() {

  const [isNavbarClicked, setIsNavbarClicked] = useState(false)


  const navigate = useNavigate();
  const location = useLocation();
 
  const state = location.state

  function handleClick() {
    if (state !== null) {
      navigate('/search', {
        state: {
          data: state,
          index: state.index
        }
      })
    }
  }
  function sendDataToHome(isClicked){
    setIsNavbarClicked(isClicked)
  
  }

 

    return (
      <div className='bg-yellow h-full desktop:h-screen sm:container text-center '>

        <div className="flex flex-col h-full parent">


          <div className="topper pb-10 desktop:pb-0">
            <Navbar className='z-50' sendDataToHome={sendDataToHome}/>

          </div >
        
          <div className="flex mx-auto items-center flex-col flex-1 grow desktop:flex-row desktop:gap-24">

            <div>

              <div className="flex" >
      
                <div class="w-[22rem] desktop:w-[52rem] flex-grow flex flex-1 flex-col rounded-[25px] overflow-hidden shadow-lg">
                      <img class="w-full flex-grow flex-1  desktop:h-80" src={state && state?.data?.[state.index].images} alt="Sunset in the mountains"/>
                </div>
              </div>

              
              <div className="flex" >
                <div className="mx-auto bg-lychee w-[18rem] py-2 -mt-5 rounded-lg desktop:w-[32rem]" >
                    <div className="text-2xl font-bold desktop:text-4xl desktop:font-semibold" > 
                      {state && state?.data?.[state.index].name}
                    </div>
                    <div className="text-gray-500 desktop:text-2xl" >
                      {state && state?.data?.[state.index].category}
                    </div>
                </div>
              </div>
            </div>
        

            
            <div>
              <div className="flex flex-1 mt-8 mb-24 w-[21rem] mx-auto bg-black/10 rounded-[25px] p-7 desktop:w-[48rem] desktop:min-h-[35rem] desktop:p-10 desktop:-mt-10 desktop:-mb-5">
                <div className="flex-1 text-justify	 flex flex-col text-lychee">
                  <div className="text-2xl font-bold desktop:text-4xl">Address:</div>
                  <div className="text-sm font-extralight mb-2 desktop:text-20">{state && state?.data?.[state.index].address}</div>
                  <div className="text-2xl font-bold desktop:text-4xl">Open Hours:</div>
                  <div className="text-sm font-extralight mb-2 desktop:text-20">{state && state?.data?.[state.index].openHours}</div>
                  <div className="text-2xl font-bold desktop:text-4xl">About:</div>
                  <div className="text-sm font-extralight desktop:text-20">{state && state?.data?.[state.index].about}</div>
                </div>
              </div>

              
                <div className="mx-auto " onClick={()=>{handleClick()}} >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <button className="text-lychee bg-teal px-24 py-2 text-2xl font-semibold rounded-[25px] hover:text-teal hover:bg-lychee">SET AS DESTINATION</button>
                  </motion.div>
                </div>
            

            </div>
            </div>

            <div className="bottom-0 w-full bg-teal fixed pb-5 pt-5 desktop:hidden">
              <div className="flex flex-row justify-around items-center">

              <div onClick={()=>{navigate('/information')}} className="rounded-[50%] p-2 ml-2 -mr-2 bg-white">
                <img className="w-6" src={BackIcon} alt="Menu icon"/>
              </div>

              <div>
              
                <button onClick={()=>{handleClick()}} className="bg-yellow text-black hover:opacity-70 font-semibold py-2 px-14 rounded-full ">
                  SET AS DESTINATION
                </button>
            
              </div>
              </div>
            </div>


      

          

      </div>
      </div>
      
  )
}

export default CardInfo