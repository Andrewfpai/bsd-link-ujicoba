import Back from '../assets/icon/back.png'
import Clock from '../assets/icon/clock.png'
import {useState, useEffect, useRef, useContext, useMemo, useCallback} from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import ruteContext from '../context/ruteContext'
import Accordion from '../components/accordion'
import BusTimer from '../components/busTimer'
import RouteNotFound from '../components/RouteNotFound'

function MyRoute() {
    const {ruteFinal} = useContext(ruteContext);
    const {jamFinal} = useContext(ruteContext);
    const {noRuteFinal} = useContext(ruteContext);
    const navigate = useNavigate();

    
    return(
      <div>

            
        
            

        <div className={(jamFinal?.at(0))?.at(0)?'hidden':'block'}>
            <RouteNotFound />
        </div>

        <div className={(jamFinal?.at(0))?.at(0)?'bg-lychee h-screen  container mx-auto text-center ':'hidden'}>

            <div className="flex justify-center flex-col  bg-teal">


            <div className="flex items-centers mb-5 flex-col mt-7 ml-5 text-lychee">

                <div className="flex items-centers mb-7">
                    <div className="my-auto ">
                    <img className="w-4 mr-2 mx-auto" src={Back} alt="Menu icon" onClick={()=>{navigate('/search')}}/>
                    </div>
                    <div className="text-20 ">Your Route</div>
                </div>

                <div className='flex flex-col'>
                    <div className="flex flex-row items-center ml-5">

                        <div class="flex items-center flex-col mr-3">
                            <div class="h-4 w-4 border-4 border-lychee rounded-full"></div>
                            <div class="h-10 w-1 bg-lychee mx-2"></div>
                            <div class="h-4 w-4 border-4 border-lychee rounded-full"></div>
                        </div>
                        <div className='text-left text-3xl flex flex-col gap-3 font-semibold'>
                            <div className='text-20 font-normal mt-1'>{(ruteFinal?.at(0))?.at(0)}</div>
                            <div>{(ruteFinal?.at(-1))?.at(-1)}</div>
                        </div>
                    </div>   
                        
                    <div className="flex flex-row items-center text-14 ml-12 mt-2 pb-10">
                
                        <div>
                            <img className="w-3 mr-2 mx-auto ml-2" src={Clock} alt="Menu icon" onClick={()=>{navigate('/search')}}/>
                        </div>
                        <div class="flex items-center flex-col mr-3">
                            <div>Arrival at {(jamFinal?.at(-1)?.at(-1))}</div>
                        </div>
                    </div>
                    
                </div>
                
            </div>

            <div className="bottomter flex flex-col flex-1 bg-lychee pb-32">
          
               
                <BusTimer busArrivalTime={(jamFinal?.at(0)?.at(0))}/>
       

                {/* <div className='mt-7 mb-5 text-3xl font-semibold text-center'>ROUTES:</div> */}
                    <div className="flex mx-auto justify-center">
              

                
           
                
                    <div className='mt-7'>
       
                        <div className={ruteFinal.length>0?"flex flex-col mb-2":"hidden"}>
                            <div className='text-20 text-gray-500 text-left mb-1'>Route 1:</div>
                            <Accordion noRute={noRuteFinal[0]} panjangRute={0}/>
                        </div>
                   
                        <div className={ruteFinal.length>1?"flex flex-col mb-2":"hidden"}>
                            <div className='text-left text-14 mb-2 text-gray-500'>Transit at:  
                                <div className="flex flex-row items-center justify-between ml-0">
                                    <span className='font-semibold text-20 text-darkTeal ml-1'> {ruteFinal.at(0)?.at(-1)}</span>
                                    <span className='mr-0 text-gray-500'>{jamFinal.at(0)?.at(-1)}</span>
                                </div>
                            </div>
                            <hr className="mb-8 border-gray-300" />
                            <div className='text-20 text-gray-500 text-left mb-1'>Route 2:</div>
                            <Accordion noRute={noRuteFinal[1]} panjangRute={1}/> 
                        </div>
                       
                        <div className={ruteFinal.length>2?"flex flex-col mb-2":"hidden"}>
                            <div className='text-left text-14 mb-2 text-gray-500'>Transit at: 
                                <div className="flex flex-row items-center justify-between ml-0">
                                    <span className='font-semibold text-20 text-darkTeal ml-1'> {ruteFinal.at(1)?.at(-1)}</span>
                                    <span className='mr-0 text-gray-500'>{jamFinal.at(1)?.at(-1)}</span>
                                </div>
                            </div>
                            <hr className="mb-8 border-gray-300" />
                            <div className='text-20 text-gray-500 text-left mb-1'>Route 3:</div>
                            <Accordion noRute={noRuteFinal[2]} panjangRute={2}/> 
                        </div>

                        <div className={ruteFinal.length>0?"flex flex-col mb-2":"hidden"}>
                            <div className='text-left text-16 mb-2 font-semibold'>Arrival at: 
                                <div className="flex flex-row items-center justify-between ml-0">
                                    <span className='font-semibold text-2xl text-darkTeal ml-1'> {ruteFinal.at(-1)?.at(-1)}</span>
                                    <span className='mr-0'>{jamFinal.at(-1)?.at(-1)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="left-0 bottom-0 w-full bg-teal fixed pb-3 pt-3">
                            <div className="flex flex-row justify-around items-center">

                            <div>
                            <button  onClick={()=>{navigate('/information')}} className="border border-2 border-lychee text-lychee rounded-lg px-4 py-2">
                                I'm Arrived, thank you!
                            </button>
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