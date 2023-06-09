import React, {useState} from 'react'


import Navbar from '../components/navbar'


function AboutUs() {

  const [isNavbarClicked, setIsNavbarClicked] = useState(false)

  function sendDataToHome(isClicked){
    setIsNavbarClicked(isClicked)
  
  }

  return (
    <div className='bg-yellow h-screen  sm:container  mx-auto '>
      <div className="flex justify-center flex-col h-full parent relative">
      <Navbar className='z-50' sendDataToHome={sendDataToHome}/>


  

     

        <div className="bottomter flex-1 bg-lychee flex-col  ">
          <div className="mt-10 pb-12 text-4xl font-semibold text-left leading-tight z-0 ml-9 desktop:pb-16 desktop:text-6xl desktop:text-center">ABOUT BSD LINK.</div>
          
          <div className="mb-7">
            <div className="w-full flex flex-col justify-center -mt-5 px-10 desktop:px-[35rem]">
                    
                <p className="font-normal text-14 desktop:text-20 text-justify leading-6 desktop:leading-9 text-gray-500 ">
                BSD Link is a <span className='text-black font-semibold'>FREE</span> public transportation service operating in Indonesia's BSD City area since 2017, launched by Sinar Mas Land & Lorena. 
                It provides free bus services for commuters, students, and residents of BSD City. The buses operate throughout the day, making it a convenient mode of transportation for those who need to travel within the city.
                </p>
            </div>
            <div className="w-full flex flex-col justify-center px-10 mt-5 desktop:px-[35rem]">
                    
                <p className="font-normal text-14 desktop:text-20 text-justify leading-6 desktop:leading-9 text-gray-500">
                BSD Link is a great initiative to provide accessible and affordable public transportation for the people of BSD City. 
                The service helps reduce traffic congestion, provides a comfortable ride, and helps commuters save money on transportation costs. The buses are equipped with air conditioning, comfortable seating, and other amenities to ensure a pleasant experience for the passengers.

                </p>
            </div>
          </div>
            
          
        </div>
        

            
        {/* </div> */}

          
        </div>
        
        
        

    </div>
  )
}


export default AboutUs