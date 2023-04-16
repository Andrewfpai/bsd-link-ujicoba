import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/image/Logo.png'



function Card({data, index}) {

    const navigate = useNavigate();

          function handleClick() {
            if (data !== null && index !== undefined) {
              navigate('/detail', {
                state: {
                  data: data,
                  index: index
                }
              })
            }
          }


    // console.log(data)

  return (
    <div className="flex justify-center " onClick={handleClick}>
    

        <div class="w-80 ml-8 flex-grow flex flex-1 flex-col border-3 border-l border-r border-b rounded-[25px] overflow-hidden shadow-lg">
          
        
              <img class="w-full flex-grow flex-1" src= {data && data[index].images} alt="Sunset in the mountains"/>
       

            <div className="flex flex-col grow flex-1">
            
              <div class="px-6 py-4 text-center">
                  <div class="font-bold text-2xl -mb-1">{data && data[index].name}</div>
                  <p class="text-gray-500 text-16">
                  {data && data[index].category}
                  </p>
              </div>

            
              </div>

        </div>
    

    </div>


// {/* <div class="grid h-80 grid-rows-2  grow ">
//   <div class="bg-darkTeal ">01</div>
//   <div class="mt-4">02</div>
 
// </div> */}

// {/* <div class="flex flex-col w-96 h-80 mr-5 flex-1">
// <img class="w-full flex-1 " src="" alt="Sunset in the mountains"/>
//   <div class="flex-1 bg-yellow mt-4 ">02</div>
 
// </div> */}

  )
}

export default Card