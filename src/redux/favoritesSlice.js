import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const initialState = {
    favoriteItems:localStorage.getItem("favoriteItems") ? JSON.parse(localStorage.getItem("favoriteItems")): [],
    favoriteWeather:[],
}


const favoriteSlicer = createSlice({
    name:"favoritesItems",
    initialState,
    reducers:{
        addToFavorites(state,action){

                const favoriteList = {...action.payload}
            state.favoriteItems.push(favoriteList);
            toast.success(`added ${action.payload.LocalizedName} to favorites `,{
                    position: "bottom-left",
                })
            localStorage.setItem("favoriteItems",JSON.stringify(state.favoriteItems));

        },
         addWeatherLocationKey(state,action){
                
            state.favoriteWeather.push({...action.payload});
        },
    removeFromFavorites(state, action) {
      state.favoriteItems.map((favorite) => {
        if (favorite._id === action.payload._id) {
          const nextFavoriteItems = state.favoriteItems.filter(
            (item) => item._id !== favorite._id
          );

          state.favoriteItems = nextFavoriteItems;
          state.favoriteWeather= nextFavoriteItems;
          toast.error(`${action.payload.LocalizedName} removed from favorites`, {
            position: "bottom-left",
          });
        }
        localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems));
        return state;
      });
    },
    clearFavorites(state, action) {
      state.favoriteItems = [];
      state.favoriteWeather= [];
      localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems));
      toast.success("Favorites cleared", { position: "bottom-left" });
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites,addWeatherLocationKey } =
  favoriteSlicer.actions;

export default favoriteSlicer.reducer;