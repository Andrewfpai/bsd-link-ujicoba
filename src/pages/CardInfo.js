import React from 'react'
import { useLocation } from 'react-router-dom';
import Logo from '../assets/image/Logo.png'
import Menu from '../assets/icon/hamburger.png'
import BackIcon from '../assets/icon/angle-small-left.png'
import { useNavigate } from 'react-router-dom';

function CardInfo() {

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const state = location.state
 

    return (
      <div className='bg-yellow h-full container mx-auto text-center '>

        <div className="flex justify-center flex-col h-full parent">


          <div className="topper pb-10 ">
            <div className="flex justify-between mx-4 items-center mt-7" >
              <img className="w-44 " src={Logo} alt="Logo" onClick={()=>{navigate('/')}}/>
              <img className="w-7 h-9 mr-2" src={Menu} alt="Menu icon"/>
            </div>

          </div >
        
          <div className="flex  mx-auto flex-col flex-1 grow">

            <div className="flex justify-center" >
    
              <div class="w-[22rem] flex-grow flex flex-1 flex-col border-3 border-l border-r border-b rounded-[25px] overflow-hidden shadow-lg">
                    <img class="w-full flex-grow flex-1" src={state && state?.data?.[state.index].images} alt="Sunset in the mountains"/>
              </div>
            </div>

            
            <div className="flex" >
              <div className="mx-auto bg-lychee w-[18rem] py-2 -mt-5 rounded-lg " >
                  <div className="text-2xl font-bold" > 
                    {state && state?.data?.[state.index].name}
                  </div>
                  <div className="text-gray-500" >
                    {state && state?.data?.[state.index].category}
                  </div>
              </div>
            </div>
        

            </div>

          <div className="flex justify-center flex-1 mt-8 mb-24 w-[21rem] mx-auto bg-black/10 rounded-[25px] p-7">
            <div className="flex-1 text-justify	 flex flex-col text-lychee">
              <div className="text-2xl font-bold ">Address:</div>
              <div className="text-sm font-extralight mb-2">{state && state?.data?.[state.index].address}</div>
              <div className="text-2xl font-bold">Open Hours:</div>
              <div className="text-sm font-extralight mb-2">{state && state?.data?.[state.index].openHours}</div>
              <div className="text-2xl font-bold">About:</div>
              <div className="text-sm font-extralight">{state && state?.data?.[state.index].about}</div>
            </div>
          </div>

          <div className="bottom-0 w-full bg-teal fixed pb-5 pt-5">
            <div className="flex flex-row justify-around items-center">

            <div onClick={()=>{navigate('/information')}} className="rounded-[50%] p-2 ml-2 -mr-2 bg-white">
              <img className="w-6" src={BackIcon} alt="Menu icon"/>
            </div>

            <div>
              <button className="bg-yellow text-black hover:opacity-70 font-bold py-2 px-14 rounded-full ">
                SET AS DESTINATION
              </button>
            </div>

            

            

          
              {/* <div>Open Hours:</div>
              <div>{state && state?.data?.[state.index].openHours}</div>
              <div>About:</div>
            <div>{state && state?.data?.[state.index].about}</div> */}
            </div>
          </div>


      

          {/* <div className="w-80 mx-auto relative">
            <img className="w-full" src="https://aeonmall-tanjungbarat.com/images/content/mallinfo.jpg" alt="Sunset in the mountains" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-24 text-left mt-52">
                <div className="font-bold text-2xl">{state && state?.data?.[state.index].name}</div>
                <div className="font-bold text-2xl">{state && state?.data?.[state.index].category}</div>
              </div>
            </div>
          </div>

        <div className="mt-20">
            <div>Address:</div>
            <div>{state && state?.data?.[state.index].address}</div>
            <div>Open Hours:</div>
            <div>{state && state?.data?.[state.index].openHours}</div>
            <div>About:</div>
            <div>{state && state?.data?.[state.index].about}</div>
        </div> */}

        {/* <div class="bg-white w-full  h-16 px-6 py-2 flex justify-between text-gray-font fixed bottom-0 shadow-lg z-40 border-t border-gray-99">
      <a href="/">
        <span class="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm  flex flex-col items-center text-center text-primary">
          <i class="w-8 fas fa-home p-1">
          </i>
          <span class="mx-1 font-roboto">Home</span>
        </span>
      </a>
      <a href="/">
        <span class="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm  flex flex-col items-center text-center">
          <i class="w-8 fas fa-envelope p-1">
          </i>
          <span class="mx-1 font-roboto">Pesan</span>
        </span>
      </a>
     <a href="/">
      <span class="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm   flex flex-col items-center text-center">
        <i class="w-8 fas fa-user-circle p-1">
        </i>
        <span class="mx-1 font-roboto">Akun</span>
      </span>
     </a>
    </div> */}

      </div>
      </div>
      
  )
}

export default CardInfo