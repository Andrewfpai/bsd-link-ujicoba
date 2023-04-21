import { useNavigate, useLocation } from 'react-router-dom';
import sadEmoji from '../assets/icon/sad_emoji.png'
import ruteContext from '../context/ruteContext'
import {useContext} from 'react'



function RouteNotFound() {

    const {jamFinal} = useContext(ruteContext);
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state
    console.log(state)

    return(
        <div className='bg-teal h-screen  container mx-auto text-center '>

        <div className="flex justify-center flex-col h-full parent relative">
  
  
            <div className="topper pb-16">
                {console.log(jamFinal)}
                {console.log("1",jamFinal.length===0?true:false)}
                {console.log("2",(jamFinal?.at(0))?.at(0)===null?true:false)}
                <div className="text-4xl text-lychee text-center font-semibold leading-tight mb-2">Sorry,</div>
                <div className="text-16 text-gray-300 text-center leading-tight mb-3 mx-5">
                    {jamFinal.length===0?"It seems like you haven't created a route yet.":"The last bus for today has already departed, please try again tomorrow."}
                </div>
                <div className='mx-auto'>
                    <img className='w-64 mx-auto' src={sadEmoji} alt="Emoji"/>
                </div>
                <button  onClick={()=>{navigate('/')}} className="border border-2 border-lychee text-lychee rounded-lg px-4 py-2">
                    Back to homepage
                </button>
            </div>


    

          </div>
          </div>
  )
}

export default RouteNotFound