import React, { useState, useEffect,useContext} from 'react';
import ruteContext from '../context/ruteContext'
import RouteNotFound from '../components/RouteNotFound'
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

const pageVariants3 = {
  initial: {
    y: "-10px",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 1,
      delay:1.6
    },
  },
 
};

const BusTimer = ({ busArrivalTime }) => {
    const {jamFinal} = useContext(ruteContext);
    const [hoursFinal, setHoursFinal] = useState()
    const [minutesFinal, setMinutesFinal] = useState()
    const [timeRemaining, setTimeRemaining] = useState(0);


    
    
    useEffect(() => {
        try{
            const [hoursStart, minutesStart] = (jamFinal?.at(0)?.at(0))?.split(':');
            const [hoursEnd, minutesEnd] = (jamFinal?.at(-1)?.at(-1))?.split(':');
            const date1 = new Date();
            date1.setHours(hoursStart);
            date1.setMinutes(minutesStart);
            date1.setSeconds(0);
        
            // Create a new date object for today at the second time
            const date2 = new Date();
            date2.setHours(hoursEnd);
            date2.setMinutes(minutesEnd);
            date2.setSeconds(0);
        
            // Calculate the difference in minutes
            const differenceInMinutes = Math.round((date2 - date1) / (1000 * 60));
        
            // Convert the difference to hours and minutes
            setHoursFinal(Math.floor(differenceInMinutes / 60))
            setMinutesFinal(differenceInMinutes % 60)
          
        
            } catch(error){
              console.log(error)
              
              
            
          }
      },[jamFinal]);
    

  
  

  useEffect(() => {
    try{
    const now = new Date();
      const [hours, minutes] = busArrivalTime?.split(":");
      const arrivalTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );
      const timeRemainingMs = arrivalTime - now;
      setTimeRemaining(Math.max(0, Math.floor(timeRemainingMs / 1000)));
      } catch (error){
        
      }

    const intervalId = setInterval(() => {
      // Set the time remaining until the bus arrives
      try{
        const now = new Date();
          const [hours, minutes] = busArrivalTime?.split(":");
          const arrivalTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes
          );
          const timeRemainingMs = arrivalTime - now;
          setTimeRemaining(Math.max(0, Math.floor(timeRemainingMs / 1000)));
          } catch (error){
           
          }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [busArrivalTime]);

  // Convert the time remaining to hours and minutes
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);

  return (
    <div className="flex mx-auto justify-center -mt-8 " >
        <motion.div
                    variants={pageVariants3}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
        <div class="bg-white w-80 py-1 flex-grow flex flex-1 flex-row rounded-lg justify-around overflow-hidden shadow-lg font-Lato">
            <div>
                <span className='text-gray-400 font-Poppins'>Next Bus: </span><br/>
                <span className={hours?'font-bold text-3xl ':'hidden'}>{hours?hours:''}<span className={hours?"font-normal text-gray-400 text-14":'hidden'}> H</span> </span>
                <span className='font-bold text-3xl'> {minutes}<span className='font-normal text-gray-400 text-14'> M</span></span>
            </div>
            
            <div>
                <span className='text-gray-400 font-Poppins'>Travel Time:</span><br/>
                <span className={hoursFinal?'font-bold text-3xl':'hidden'}>{hoursFinal}<span className={hoursFinal?"font-normal text-gray-400 text-14":'hidden'}> H</span></span> 
                <span className='font-bold text-3xl'> {minutesFinal}<span className='font-normal text-gray-400 text-14'> M</span></span>
            </div>
        </div>
        </motion.div>
    </div>
  );
};

export default BusTimer;