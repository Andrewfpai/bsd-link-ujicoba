import Back from '../assets/icon/arrow-left.png'
import {useState, useEffect, useRef, useContext, useMemo, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import ruteContext from '../context/ruteContext'

function MyRoute() {
    const {ruteFinal} = useContext(ruteContext);
    const navigate = useNavigate();

    return(
      <div>
        <div className='bg-yellow h-screen  container mx-auto text-center '>

            <div className="flex justify-center flex-col  parent relative">


            <div className="flex items-centers mb-5 flex-col mt-7 ml-5">

                <div className="flex items-centers">
                    <div className="my-auto ">
                    <img className="w-4 mr-2 mx-auto" src={Back} alt="Menu icon" onClick={()=>{navigate('/search')}}/>
                    </div>
                    <div className="text-20 font-semibold">Set Location & Destination</div>
                </div>

                <div className='flex flex-1 flex-col'>
                    <div>{ruteFinal[0]}</div>
                    <div>{ruteFinal.at(-1)}</div>
                </div>
            </div>

            <div className="bottomter flex-1 bg-lychee">

                <div className="flex flex-row  justify-around">
                    <div>Bus Stop</div>
                    <div>Transit</div>
                    <div>Arrival Time</div>

                </div>

                <div className="flex flex-col justify-center mt-10 mb-10 mx-auto  p-7 min-w-16 overflow-y-scroll hide-scroll-bar">
                    {ruteFinal.map((item, index) => (
                    <p
                    className='py-5 px-5 bg-teal'
                    key={index}
                    
                    >
                    {item}
                    </p>
                ))}

                </div>
            </div>

        
      </div>
      </div>
      </div>
  )
}

export default MyRoute