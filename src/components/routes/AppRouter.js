import React from 'react'
import { HashRouter as Router , Route , Routes } from 'react-router-dom'
import Header from '../features/header/Header'
import Favorites from '../pages/Favorites'
import Weather from '../pages/Weather'

const AppRouter = () => {
    return (
        <>
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Weather/>}></Route> 
                <Route exact path="/favorites" element={<Favorites/>}></Route> 
            </Routes>
        </Router>
        </>
    )
}

export default AppRouter
