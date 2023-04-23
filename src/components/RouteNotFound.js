import { useNavigate, useLocation } from 'react-router-dom';
import sadEmoji from '../assets/icon/sad_emoji.png'
import ruteContext from '../context/ruteContext'
import {useContext} from 'react'
import { motion } from "framer-motion";



function RouteNotFound() {

    const {jamFinal} = useContext(ruteContext);
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state
   
    return(
        <div className='bg-teal h-screen  sm:container mx-auto text-center '>

        <div className="flex justify-center flex-col h-full parent relative">
  
  
            <div className="topper pb-16">
              
                <div className="text-4xl text-lychee text-center font-semibold leading-tight mb-2 desktop:text-6xl">Sorry,</div>
                <div className="text-16 text-gray-300 text-center leading-tight mb-3 mx-5 desktop:text-2xl">
                    {jamFinal.length===0?"It seems like you haven't created a route yet.":"The last bus for today has already departed, please try again tomorrow."}
                </div>
                <div className='mx-auto'>
                    <img className='w-64 mx-auto desktop:w-80' src={sadEmoji} alt="Emoji"/>
                </div>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                >
      
                    <button  onClick={()=>{navigate('/')}} className="border border-2 border-lychee text-lychee rounded-lg px-4 py-2 cursor-pointer desktop:text-20 hover:">
                        Back to homepage
                    </button>
                </motion.div>

            </div>


    

          </div>
          </div>
  )
}

export default RouteNotFound