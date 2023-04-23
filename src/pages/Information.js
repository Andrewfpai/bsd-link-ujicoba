import React, {useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/navbar'
import { motion } from "framer-motion";



function Information() {

  // const [data, setData] = useState()
  const navigate = useNavigate();

    const {data, isLoading, error} = useQuery({
        queryKey: ['data_destinasi'],
        queryFn: () => {
            return fetch(`https://raw.githubusercontent.com/Andrewfpai/bsdLinkInfo/main/bsdLinkInfo.json`)
              .then(res => res.json())
        },
          })

    const [isNavbarClicked, setIsNavbarClicked] = useState(false)


    function sendDataToHome(isClicked){
      setIsNavbarClicked(isClicked)

    }
     

  return (
    <div className='bg-yellow h-screen desktop:h-full sm:container mx-auto text-center '>
      <div className="flex justify-center flex-col h-full parent relative">
      <Navbar className='z-50' sendDataToHome={sendDataToHome}/>


  
      <motion.nav
          initial={{ y: -100, opacity:0 }}
          animate={{ y: 0, opacity:1}}
          transition={{ type: "spring", stiffness: 120, duration: 0.5, damping:20, delay:0.3}}
        >
          <div className="mt-10 pb-16 text-4xl font-semibold text-center leading-tight z-0 text-center desktop:text-[5rem]">Where would you <br /> like to go?</div>
          </motion.nav>
 

        <div className="bottomter flex-1 bg-lychee">
          {/* <div className="-mt-5 border-teal border-2 bg-white rounded-[25px] relative border-teal text-gray-600 focus-within:text-gray-400">
            <div className="">Sea</div> */}

            <div class="flex items-center justify-center desktop:hidden" onClick={()=>{navigate('/search')}}>
              <div class="relative  -mt-5 focus-within:text-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2 desktop:pl-5">
                  <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="#43a3a2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
                </span>
                <input type="search" name="q" class="py-2 border-2 border-teal text-sm text-white bg-white rounded-[25px] pl-10 focus:outline-none focus:bg-white focus:text-gray-900 desktop:py-4 desktop:px-32 desktop:text-20" placeholder="Search Your Destination..." autocomplete="off"/>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.1 }}>
              <div class="items-center justify-center hidden desktop:flex" onClick={()=>{navigate('/search')}}>
                <div class="relative  -mt-5 focus-within:text-gray-400">
                  <button class="bg-teal px-10 py-2 flex flex-row items-center rounded-[25px] text-lychee">
                  <svg fill="none" stroke="#fff7ec" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className='text-2xl ml-5'>Search Your Destination</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="text-2xl font-extralight text-left ml-10 mt-10 mb-3 desktop:text-4xl desktop:ml-20">Top Places :</div>


            <div class="flex overflow-x-scroll pb-10 hide-scroll-bar desktop:ml-10">
          
          

              <Card data={data} index={0}/>
              <Card data={data} index={1}/>
              <Card data={data} index={2}/>
              <Card data={data} index={3}/>
              <Card data={data} index={4}/>
           


            </div>
        

            
        {/* </div> */}

          
        </div>
        
        
        
      </div>

    </div>
  )

  // {/* <div className="font-bold text-sm">Where would you like to go</div> */}

  //         {/* <div class="flex overflow-x-scroll pb-10 hide-scroll-bar ml-4">
          
          

  //           <Card data={data} index={0}/>
  //           <Card data={data} index={1}/>
  //           <Card data={data} index={2}/>
  //           <Card data={data} index={3}/>
  //           <Card data={data} index={4}/>
  //           <Card data={data} index={4}/>
  //           <Card data={data} index={4}/>
  //           <Card data={data} index={4}/>


  //         </div>
  //         */}
          
          

  //             {/* <div className="flex items-center">
  //             <div class="">
  //                 <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  //                     <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
  //                 </div>
  //                 <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
  //             </div>
  //             <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  //                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
  //                 <span class="sr-only">Search</span>
  //             </button>
  //             </div> */}
}

export default Information