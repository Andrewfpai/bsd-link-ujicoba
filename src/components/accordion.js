import Back from '../assets/icon/back.png'
import Clock from '../assets/icon/clock.png'
import {useState, useEffect, useRef, useContext, useMemo, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import ruteContext from '../context/ruteContext'
import { useQuery } from '@tanstack/react-query'

function Accordion({noRute, panjangRute}) {
    const {ruteFinal} = useContext(ruteContext);
    const {jamFinal} = useContext(ruteContext);
    const [isOpen, setIsOpen] = useState(false);

    const {data, isLoading, error} = useQuery({
        queryKey: ['data_destinasi'],
        queryFn: () => {
            return fetch(`https://raw.githubusercontent.com/Andrewfpai/bsd-link-library/main/bsd-link.json`)
              .then(res => res.json())
        },
          })


    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
   

    return(   

        <div className="flex flex-col bg-teal min-w-[22rem] max-w-[23rem] px-6 text-lychee rounded-lg">
            <div
                className={isOpen?"flex items-center justify-between py-2 cursor-pointer border-b border-gray-300":"flex items-center justify-between py-2 cursor-pointer"}
                onClick={toggleAccordion}
            >
                <h2 className="text-lg font-medium">{data && data.semua_rute && data.semua_rute[noRute] && data?.semua_rute[noRute]?.judul_rute}</h2>
                <svg
                className={`w-6 h-6 transition-transform ${
                    isOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                />
                </svg>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "h-full" : "max-h-0"
                }`}
            >
                <div className='flex flex-row justify-between mt-4 text-gray-300 pb-2'>
                    <div className='text-left'>
                    {ruteFinal[panjangRute]?.map((halte,index)=>{
                        return <p className='mb-1 text-gray-100'>{halte}</p>
                    })}
                    </div>
                    <div className='flex text-left flex-col'>
                
                    {jamFinal[panjangRute]?.map((jam,index)=>{
                        return <p className='mb-1 '>{jam}</p>
                    })}
                    </div>
                </div>
            </div>
        </div>

  )
}

export default Accordion