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


        <div className='bg-lychee h-screen container mx-auto text-center flex flex-1 grow testdlu'>

          <div className="flex flex-col ">


  
          <input
                        autoFocus
                        type="search"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value);}}
                        class=" py-2 border-none text-sm text-white bg-transparent rounded-[25px] pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Your Location..." autocomplete="off"
                        />

          

            <div className="flex flex-col justify-center flex-1 mt-10 mb-10 w-[21rem] mx-auto bg-black/10 rounded-[25px] p-7">
            {filteredData.map((item, index) => {
            console.log("TEST",filteredData)
           return <p className='text-teal bg-lychee px-6 py-2 mb-2 ' key={index}>{item}</p>
          })}
            </div>

            
      
            </div>
        {/* </div> */}
   
        </div>
     


       
      
      
  )
}

export default Search