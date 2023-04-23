import React, {useState} from 'react'

import Pai from '../assets/image/profile-picture-pai.jpg'
import Opin from '../assets/image/profile-picture-opin.jpg'


import Navbar from '../components/navbar'


function AboutUs() {


  const [isNavbarClicked, setIsNavbarClicked] = useState(false)

  function sendDataToHome(isClicked){
    setIsNavbarClicked(isClicked)
  
  }

  return (
    <div className='bg-yellow h-full sm:container mx-auto '>
      <div className="flex justify-center flex-col h-full parent relative">
      <Navbar className='z-50' sendDataToHome={sendDataToHome}/>


  

     

        <div className="bottomter flex-1 bg-lychee">
          <div className="mt-10 pb-12 text-4xl font-semibold text-left leading-tight z-0 ml-9 desktop:pb-16 desktop:text-6xl desktop:text-center">ABOUT US.</div>
          
          <div className="mb-7">
            <div className="w-full flex flex-col justify-center -mt-5 px-10 desktop:px-[35rem]">
                    
                <p className="font-normal text-14 desktop:text-20 text-justify leading-6 desktop:leading-9 text-gray-500 ">
                EasyLink is a forward-thinking website created by two students from SMA Santa Ursula BSD Grade 11, Nicolas Andrew and Josefine Celka. 
                Together, We have created a bus route platform called EasyLink that makes commuting in the BSD area easy and hassle-free for users. 
                Nicolas is a skilled web developer who specializes in building efficient and functional websites, while Josefine is an experienced UI/UX designer who focuses on creating user-friendly interfaces.
                </p>
            </div>
            <div className="w-full flex flex-col justify-center mt-5 px-10 desktop:px-[35rem]">
                    
                <p className="font-normal text-14 desktop:text-20 text-justify leading-6 desktop:leading-9 text-gray-500 ">
                We believe that everyone should have access to convenient and reliable transportation. That's why we've created EasyLink, a bus route platform that's designed to make commuting easier and more enjoyable for users. 
                Our platform is designed to be intuitive, efficient, and easy to use, and we've taken great care to ensure that it meets the needs of both regular commuters and visitors to the BSD area.

                </p>
            </div>
          </div>
            
          <div className=' flex flex-row gap-5 text-center px-10 desktop:px-[35rem] desktop:mt-16 desktop:mb-12'>
            <section class="w-36 mb-10 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg desktop:w-72">
          
              <div class="mt-3 w-fit mx-auto desktop:mt-6">
                  <img src={Pai} class="rounded-[50%] w-16 h-16 object-cover desktop:w-32 desktop:h-32" alt="profile"/>
              </div>

              <div class="mt-5">
                  <h2 class="text-lychee font-semibold text-16 tracking-wide desktop:text-2xl">Nicolas Andrew</h2>
              </div>
              <p class="text-gray-500 mt-2.5 text-12 desktop:text-16" >
                  Web Developer
              </p>
            </section>

            <section class="w-36 mb-10 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg desktop:w-72">
          
              <div class="mt-3 w-fit mx-auto desktop:mt-6">
                  <img src={Opin} class="rounded-[50%] w-16 h-16 object-cover desktop:w-32 desktop:h-32" alt="profile"/>
              </div>

              <div class="mt-5">
                  <h2 class="text-lychee font-semibold text-16 tracking-wide desktop:text-2xl">Josefine Celka</h2>
              </div>
              <p class="text-gray-500 mt-2.5 text-12 desktop:text-16" >
                  UI/UX Designer
              </p>
            </section>
          </div>
        </div>
        

            
        {/* </div> */}

          
        </div>
        
        
        

    </div>
  )
}


export default AboutUs