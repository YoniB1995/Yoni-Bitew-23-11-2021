import React, {useEffect} from 'react'
import styled from 'styled-components'
import FavoritesCard from '../features/card/FavoritesCard'
import { useSelector, useDispatch } from "react-redux";
import {
  clearFavorites,
  removeFromFavorites
} from "../../redux/favoritesSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.favorites);
  const {favoriteWeather , favoriteItems} = list;

  
  const handleRemove = (product) => {
    dispatch(removeFromFavorites(product));
  };
  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  const getDetails = () => {
      console.log(list.favoriteItems)
  }
  
    return (
        
        <FavoritesBody className="animate__animated animate__fadeInUp">
            <FavoritesBox>
            <h2>Favorites</h2>
            <button onClick={getDetails} >Get Items</button>
            <List>
            {favoriteWeather?.map((item,i)=>
            <FavoritesCard key={i} city={favoriteItems[i].LocalizedName} desc={favoriteWeather["0"].WeatherText} cityKey={favoriteItems[i].Key} 
            // celsius={favoriteWeather["0"].Temperature.Metric}
            />
            )}</List>
            <button onClick={handleClearFavorites}>Clear Favorites</button>
            </FavoritesBox>
        </FavoritesBody>
        
    )
}

export default Favorites


const FavoritesBody = styled.div` 
background: url('https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260') no-repeat center / cover;
  color: #fff;
height:100vh;
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const FavoritesBox = styled.div` 
border:1px solid black;
opacity:7;
border-radius:15px;
height:80%;
width:80%;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`
const List = styled.div` 
display:flex;
flex-direction:row;
`