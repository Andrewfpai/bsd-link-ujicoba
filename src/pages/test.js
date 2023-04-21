import React,{useRef, useState, useEffect, useCallback} from 'react'
import { useLocation } from 'react-router-dom';
import Logo from '../assets/image/Logo.png'
import Menu from '../assets/icon/hamburger.png'
import BackIcon from '../assets/icon/angle-small-left.png'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import useDebounce from '../hooks/useDebounce'



function Search() {

    const navigate = useNavigate();
    const location = useLocation();

    const count = useRef(0)
    const inputRef = useRef('null');

    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')
    const debouncedSearchTerm = useDebounce(search, 1000)
 
    
    useEffect(() => {
        count.current = count.current + 1;
        console.log(filteredData)
      });

      useEffect(() => {
        // inputRef.current && inputRef.current.focus();
      }, []);
        
    
        const {data, isLoading, error} = useQuery({
          queryKey: ['data_halte'],
          queryFn: () => {
              return fetch(`https://raw.githubusercontent.com/Andrewfpai/bsd-link-library/main/bsd-link.json`)
                .then(res => res.json())
          },
            })

           
    
            // untuk filter search bar
            useEffect(() => {
              const filtered = data?.nama_halte?.filter(item => {
                if (debouncedSearchTerm === '') {
                  return item;
                } else {
              
                  return item?.toLowerCase()?.includes(debouncedSearchTerm.toLowerCase());
                }
              });
       
              setFilteredData(filtered || []);
            }, [data, debouncedSearchTerm]);
            
            if (isLoading) return <div>Loading...</div>;

            if (error) return <div>Error: {error.message}</div>;
 

    return (


        <div className='bg-lychee h-full container mx-auto text-center flex flex-1 grow'>

          {/* <div className="flex justify-center flex-col min-h-screen parent relative"> */}


  
          <input
                        autoFocus
                        type="search"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value);}}
                        class=" py-2 border-none text-sm text-white bg-transparent rounded-[25px] pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Your Location..." autocomplete="off"
                        />

          


       
          {/* <div className="-mt-5 border-teal border-2 bg-white rounded-[25px] relative border-teal text-gray-600 focus-within:text-gray-400">
            <div className="">Sea</div> */}

            {/* <div class="flex bg-lychee items-center justify-center mt-7">

                <div className="flex items-center mr-2">
                    <img className="w-6" src={BackIcon} alt="Menu icon"/>
                </div>

                <div class="flex flex-col border border-2 rounded-lg divide-y bg-black/10">

                <div class="relative focus-within:text-gray-400 mb-2">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                        <svg fill="none" stroke="#43a3a2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                    </span>
                    <div ref={inputRef}>
                    <input
                        autoFocus
                        type="search"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value);}}
                        class=" py-2 border-none text-sm text-white bg-transparent rounded-[25px] pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Your Location..." autocomplete="off"
                        />
                 
                    </div>
                </div>

                <div>TEST</div> */}

            
              {/* <div class="relative focus-within:text-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="#43a3a2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
                </span>
                <div ref={inputRef}>
                <input
                    autoFocus
                    type="search"
                    value={search}
                    onChange={(e) => {setSearch(e.target.value);}}
                    class=" py-2 border-2 border-teal text-sm text-white bg-white rounded-[25px] pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search Your Destination..." autocomplete="off"
                    />
                </div>
              </div> */}

            {/* </div>
            </div> */}
            <div className="flex flex-col justify-center flex-1 mt-10 mb-10 w-[21rem] mx-auto bg-black/10 rounded-[25px] p-7">
            {filteredData.map((item, index) => {
            console.log("TEST",filteredData)
           return <p className='text-teal bg-lychee px-6 py-2 mb-2 ' key={index}>{item}</p>
          })}
            </div>

            <div className="flex flex-1 grow bg-lychee h-full"></div>
      
  
        {/* </div> */}
   
        </div>
     


       
      
      
  )
}

export default Search