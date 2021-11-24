import React, {useEffect} from 'react'
import styled from 'styled-components'
import FavoritesCard from '../features/card/FavoritesCard'
import { useSelector, useDispatch } from "react-redux";
import {
  clearFavorites,
  removeFromFavorites
} from "../../redux/favoritesSlice";

const Favorites = () => {
     const list = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromFavorites(product));
  };
  const handleClearCart = () => {
    dispatch(clearFavorites());
  };

  const getDetails = () => {
      console.log(list.favoriteItems)
  }
  
    return (
        
        <FavoritesBody>
            <FavoritesBox>
            <h2>Favorites</h2>
            <button onClick={getDetails} >Get Items</button>
            <List>
            {list.favoriteItems?.map((item,i)=>
            <FavoritesCard key={i} title={item.name} itemId={item.temp} />
            )}</List>
            <button onClick={handleClearCart}>Clear Favorites</button>
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