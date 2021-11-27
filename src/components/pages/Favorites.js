import React from 'react'
import styled from 'styled-components'
import FavoritesCard from '../features/card/FavoritesCard'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from "react-redux";
import {clearFavorites} from "../../redux/favoritesSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.favorites);
  const {favoriteWeather , favoriteItems} = list;

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  
    return (
        
        <FavoritesBody className="animate__animated animate__fadeInUp">
            <FavoritesBox>
            <h2>Favorites</h2>
            <List>
            {favoriteWeather?.map((item,i)=>
            <FavoritesCard key={i} city={favoriteItems[i].LocalizedName} desc={favoriteWeather[i]["0"].WeatherText} cityKey={favoriteItems[i].Key} 
            celsius={favoriteWeather[i]["0"].Temperature}
            />
            )}</List>
            <Button onClick={handleClearFavorites} variant="danger">Clear Favorites</Button>
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