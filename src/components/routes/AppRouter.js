import React ,{useState} from 'react'
import { HashRouter as Router , Route , Routes } from 'react-router-dom'
import Backdrop from '../features/header/Backdrop'
import Header from '../features/header/Header'
import SideDrawer from '../features/header/SideDrawer'
import Favorites from '../pages/Favorites'
import Weather from '../pages/Weather'

const AppRouter = () => {
      const [sideToggle, setSideToggle] = useState(false);

    return (
        <>
        <Router>
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <Header click={() => setSideToggle(true)} />
   
           
            <Routes>
                <Route exact path="/" element={<Weather/>}></Route> 
                <Route exact path="/:id" element={<Weather/>}></Route> 
                <Route exact path="/favorites" element={<Favorites/>}></Route> 
            </Routes>
        </Router>
        </>
    )
}

export default AppRouter
