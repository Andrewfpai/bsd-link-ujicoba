import './App.css';
import Search from './components/search'
import ruteContext from './context/ruteContext'
import {useState} from 'react'




function App() {

  const [ruteFinal, setRuteFinal] = useState([])

  console.log("HELOOO",ruteFinal)

  return (
    <ruteContext.Provider value={{ ruteFinal, setRuteFinal }}> 

      <div className="d-flex flex-row">
        <Search />
        {ruteFinal.map((halte)=>{
          return <p>{halte}-</p>
        })}
      </div>

    </ruteContext.Provider>
  )
}



export default App;
