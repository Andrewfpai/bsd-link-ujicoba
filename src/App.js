import './App.css';
import {useState, useRef} from 'react'
import {Routes, Route } from "react-router-dom";

// import Search from './components/search'
import DisplayRoute from './components/displayRoute'

import Information from './pages/Information'
import Home from './pages/Home'
import AboutUs from './pages/aboutUs'
import AboutBSDLink from './pages/aboutBSDLink'
import CardInfo from './pages/CardInfo'
// import Search from './components/algorithm'
import Search from './pages/Search'
import MyRoute from './pages/Route'
import NoPage from './pages/NoPage'
import RouteNotFound from './components/RouteNotFound'
import PageTransition from './components/pageTransition'

import ruteContext from './context/ruteContext'





function App() {

  const [ruteFinal, setRuteFinal] = useState([])
  const [jamFinal, setJamFinal] = useState([])
  const [noRuteFinal, setNoRuteFinal] = useState([])

  
  
  return (
    <ruteContext.Provider value={{ ruteFinal, setRuteFinal, jamFinal, setJamFinal,noRuteFinal, setNoRuteFinal}}> 
      
    
          <div className="font-Poppins">
          

            <PageTransition>
          <Routes>
          
            <Route exact path="/" element={<Home />}/>
            <Route path="/information" element={<Information />} />
            <Route path="/detail" element={<CardInfo />} />
            <Route path="/search" element={<Search />} />
            <Route path="/route" element={<MyRoute />} />
            <Route path="/routeNotFound" element={<RouteNotFound />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/aboutBSDLink" element={<AboutBSDLink />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
            </PageTransition>
            
          </div>

      
    </ruteContext.Provider>
  )
}



export default App;

