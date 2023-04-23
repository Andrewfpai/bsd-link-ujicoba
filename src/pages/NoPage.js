import { useNavigate } from 'react-router-dom';
import sadEmoji from '../assets/icon/sad_emoji.png'
import { motion } from "framer-motion";


function NoPage() {

    const navigate = useNavigate();

    return(
        <div className='bg-lcyhee h-screen  container mx-auto text-center '>

        <div className="flex justify-center flex-col h-full parent relative">
  
  
            <div className="topper pb-16">
                
                <div className="text-4xl text-center leading-tight desktop:text-6xl">ERROR 404 <br/>PAGE NOT FOUND</div>
                <div className="text-20 text-gray-400 text-center leading-tight mb-7 desktop:text-2xl">Looks like you got lost</div>
                <div className='mx-auto'>
                    <img className='w-64 mx-auto desktop:w-80' src={sadEmoji} alt="Emoji"/>
                </div>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                >
      
                    <button  onClick={()=>{navigate('/')}} className="border border-2 border-teal text-teal rounded-lg px-4 py-2 cursor-pointer desktop:text-20 hover:">
                        Back to homepage
                    </button>
                </motion.div>
            </div>


    

          </div>
          </div>
        
  )
}

export default NoPage