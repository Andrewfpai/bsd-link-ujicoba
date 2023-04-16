import './App.css';
import {useState} from 'react'
import {Routes, Route } from "react-router-dom";

// import Search from './components/search'
import Card from './components/Card'

import Information from './pages/Information'
import Home from './pages/Home'
import CardInfo from './pages/CardInfo'
// import Search from './components/algorithm'
import Search from './pages/Search'
import MyRoute from './pages/Route'

import ruteContext from './context/ruteContext'





function App() {

  const [ruteFinal, setRuteFinal] = useState([])


 console.log(ruteFinal)

  return (
    <ruteContext.Provider value={{ ruteFinal, setRuteFinal }}> 
      
      
          <div className="font-Poppins">

          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/information" element={<Information />} />
            <Route path="/detail" element={<CardInfo />} />
            <Route path="/search" element={<Search />} />
            <Route path="/route" element={<MyRoute />} />
    
            
          </Routes>
            
          </div>

      
    </ruteContext.Provider>
  )
}



export default App;

