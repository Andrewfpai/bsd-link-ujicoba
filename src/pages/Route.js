import Back from '../assets/icon/back.png'
import Clock from '../assets/icon/clock.png'
import {useState, useContext,} from 'react'
import { useNavigate } from 'react-router-dom';
import ruteContext from '../context/ruteContext'
import Accordion from '../components/accordion'
import BusTimer from '../components/busTimer'
import RouteNotFound from '../components/RouteNotFound'
import { motion } from "framer-motion";


const pageVariants = {
  initial: {
    x: "-100vw",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 1,
    },
  },
 
};

const pageVariants2 = {
    initial: {
      y: "-10px",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.5,
        delay:1.1
      },
    },
   
  };
const pageVariants3 = {
    initial: {
      y: "-10px",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 1,
        delay:2
      },
    },
   
  };

function MyRoute() {
    const {ruteFinal} = useContext(ruteContext);
    const {jamFinal} = useContext(ruteContext);
    const {noRuteFinal} = useContext(ruteContext);
    const navigate = useNavigate();
    const [waktuBusSelanjutnya, setWaktuBusSelanjutnya] = useState()

    function sendDataToRoute(isNull){
        setWaktuBusSelanjutnya(isNull)
      
      }

    
    return(
        
        <div>

      
        
          
        <div className={((jamFinal?.at(0))?.at(0)&&(jamFinal?.at(-1))?.at(-1))&&waktuBusSelanjutnya!==null?'hidden':'block'}>
            <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <RouteNotFound />
            </motion.div>
        </div>

        <div className={(jamFinal?.at(0))?.at(0)&&(jamFinal?.at(-1))?.at(-1)?'bg-lychee h-screen  sm:container mx-auto text-center ':'hidden'}>

            <div className="flex justify-center flex-col  bg-teal">

            <div className='z-10 desktop:flex desktop:flex-row desktop:items-center'>
                <div className="flex items-centers mb-5 flex-col mt-7 ml-5 text-lychee desktop:ml-10">

                    <div className="flex items-centers mb-7">
                        <div className="my-auto ">
                        <img className="cursor-pointer w-4 mr-2 mx-auto desktop:w-12 desktop:mr-5" src={Back} alt="Menu icon" onClick={()=>{navigate('/search')}}/>
                        </div>
                        <div className="text-20 desktop:text-5xl">Your Route</div>
                    </div>

                    <div className='flex flex-col'>
                        <motion.div
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                        <div className="flex flex-row items-center ml-5 desktop:ml-16">

                            <div class="flex items-center flex-col mr-3 desktop:-mt-2">
                                <div class="h-4 w-4 border-4 border-lychee rounded-full desktop:w-6 desktop:h-6"></div>
                                <div class="h-10 w-1 bg-lychee mx-2 desktop:h-20"></div>
                                <div class="h-4 w-4 border-4 border-lychee rounded-full desktop:w-6 desktop:h-6 "></div>
                            </div>
                            <div className='text-left text-3xl flex flex-col gap-3 font-semibold desktop:text-6xl'>
                                <div className='text-20 font-normal mt-1 desktop:text-4xl desktop:mt-0'>{(ruteFinal?.at(0))?.at(0)}</div>
                                <div className="desktop:mt-2">{(ruteFinal?.at(-1))?.at(-1)}</div>
                            </div>
                        </div>   
                        </motion.div>
                        <motion.div
                        variants={pageVariants2}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        >
                            
                        <div className="flex flex-row items-center text-14 ml-12 mt-2 pb-3 desktop:ml-24 desktop:text-20">
                    
                            <div>
                                <img className="w-3 mr-2 mx-auto ml-2 desktop:w-5" src={Clock} alt="Menu icon" onClick={()=>{navigate('/search')}}/>
                            </div>
                            <div class="flex items-center flex-col mr-3">
                                <div>Arrival at {(jamFinal?.at(-1)?.at(-1))}</div>
                            </div>
                        </div>
                        </motion.div>
                        
                    </div>
                    
                </div>
                <BusTimer busArrivalTime={(jamFinal?.at(0)?.at(0))} sendDataToRoute={sendDataToRoute}/>
                </div>

            <div className="bottomter flex flex-col flex-1 bg-lychee pb-32 pt-10">
          
                
                

                {/* <div className='mt-7 mb-5 text-3xl font-semibold text-center'>ROUTES:</div> */}
                    <div className="flex mx-auto justify-center">
 
                    <div className='mt-7 desktop:mt-12'>
                        <motion.div
                            variants={pageVariants3}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                        <div className="desktop:flex desktop:flex-row desktop:justify-between desktop:gap-20">
                            <div className={ruteFinal.length>0?"flex flex-col":"hidden"}>
                                <div className='text-20 text-gray-500 text-left mb-1 desktop:text-3xl desktop:mb-2'>Route 1:</div>
                                <Accordion noRute={noRuteFinal[0]} panjangRute={0}/>
                                
                                <div className={ruteFinal.length>1?'text-left text-14 mb-2 text-gray-500 mt-2 desktop:text-20':'hidden'}>Transit at:  
                                    <div className="flex flex-row items-center justify-between ml-0">
                                        <span className='font-semibold text-20 text-darkTeal ml-1 desktop:text-3xl'> {ruteFinal.at(0)?.at(-1)}</span>
                                        <span className='mr-0 text-gray-500 desktop:text-20'>{jamFinal.at(0)?.at(-1)}</span>
                                    </div>
                                </div>
                                <div className={ruteFinal.length===1?"hidden desktop:flex flex flex-col mb-2 mt-4":"hidden"}>
                                    <div className='text-left text-16 mb-2 font-semibold desktop:text-20'>Arrival at: 
                                        <div className="flex flex-row items-center justify-between ml-0 gap-8">
                                            <span className='font-semibold text-2xl text-darkTeal ml-1 desktop:text-4xl'> {ruteFinal.at(-1)?.at(-1)}</span>
                                            <span className='mr-0 desktop:text-2xl'>{jamFinal.at(-1)?.at(-1)}</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className={ruteFinal.length===1?"mb-2 mt-6 border-gray-300 desktop:hidden":"mb-4 border-gray-300 desktop:hidden"} />
                            </div>
                    
                            <div className={ruteFinal.length>1?"flex flex-col":"hidden"}>
                                
                                <div className='text-20 text-gray-500 text-left mb-1 desktop:text-3xl desktop:mb-2'>Route 2:</div>
                                <Accordion noRute={noRuteFinal[1]} panjangRute={1}/> 

                                <div className={ruteFinal.length>2?'text-left text-14 mb-2 text-gray-500 mt-2 desktop:text-20':'hidden'}>Transit at: 
                                    <div className="flex flex-row items-center justify-between ml-0">
                                        <span className='font-semibold text-20 text-darkTeal ml-1 desktop:text-3xl'> {ruteFinal.at(1)?.at(-1)}</span>
                                        <span className='mr-0 text-gray-500 desktop:text-20'>{jamFinal.at(1)?.at(-1)}</span>
                                    </div>
                                </div>

                                <div className={ruteFinal.length===2?"hidden desktop:flex flex flex-col mb-2 mt-2":"hidden"}>
                                    <div className='text-left text-16 mb-2 font-semibold desktop:text-20'>Arrival at: 
                                        <div className="flex flex-row items-center justify-between ml-0 gap-8">
                                            <span className='font-semibold text-2xl text-darkTeal ml-1 desktop:text-4xl'> {ruteFinal.at(-1)?.at(-1)}</span>
                                            <span className='mr-0 desktop:text-2xl'>{jamFinal.at(-1)?.at(-1)}</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className={ruteFinal.length===2?"mb-2 mt-6 border-gray-300 desktop:hidden":"mb-4 border-gray-300 desktop:hidden"} />
                            </div>
                            
                        
                                <div className={ruteFinal.length>2?"flex flex-col mb-2":"hidden"}>
                                    
                                    <div className='text-20 text-gray-500 text-left mb-1 desktop:text-3xl desktop:mb-2'>Route 3:</div>
                                    <Accordion noRute={noRuteFinal[2]} panjangRute={2}/> 
                                    <div className={ruteFinal.length===3?"hidden desktop:flex flex flex-col mb-2 mt-2":"hidden"}>
                                        <div className='text-left text-16 mb-2 font-semibold desktop:text-20'>Arrival at: 
                                            <div className="flex flex-row items-center justify-between ml-0 gap-8">
                                                <span className='font-semibold text-2xl text-darkTeal ml-1 desktop:text-4xl'> {ruteFinal.at(-1)?.at(-1)}</span>
                                                <span className='mr-0 desktop:text-2xl'>{jamFinal.at(-1)?.at(-1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={ruteFinal.length>0?"flex flex-col mb-2 mt-2 desktop:hidden":"hidden"}>
                                    <div className='text-left text-16 mb-2 font-semibold'>Arrival at: 
                                        <div className="flex flex-row items-center justify-between ml-0">
                                            <span className='font-semibold text-2xl text-darkTeal ml-1'> {ruteFinal.at(-1)?.at(-1)}</span>
                                            <span className='mr-0'>{jamFinal.at(-1)?.at(-1)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                    </motion.div>
                        
                        <div className={((jamFinal?.at(0))?.at(0)&&(jamFinal?.at(-1))?.at(-1))&&waktuBusSelanjutnya!==null?"left-0 bottom-0 w-full bg-teal shadow-lg fixed py-3 desktop:py-6":'hidden'}>
                            <div className="flex flex-row justify-around items-center ">

                            <div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <button  onClick={()=>{navigate('/information')}} className="border border-2 border-lychee text-lychee rounded-lg px-4 py-2 desktop:text-2xl">
                                    I'm Arrived, thank you!
                                </button>
                            </motion.div>
                            </div>
                            </div>
                        </div>
                        
                       
                    </div>
                </div>

            </div>

        
      </div>
      </div>
      </div>
     
  )
}

export default MyRoute