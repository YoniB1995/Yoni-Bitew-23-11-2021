import { createSlice } from "@reduxjs/toolkit";
import {telAvivForecast,telAvivCurrentCondition} from '../services/mockCityApi'

const initialState = {
    cityDetails : {name:"Tel Aviv",temp:"23°C",current:telAvivCurrentCondition ,telAvivForecast:telAvivForecast,isFavored:false},
    isFavored:false,
    status:null
}


const citySlicer = createSlice({
    name:"cityDetails",
    initialState,
    reducers:{
        getCityDetails(state,action){
            state.cityDetails = action.payload
            }
        },
        ChangedToFavorite(state,action){
            state.isFavored = true;
            
        }
  ,});

export const { getCityDetails,ChangedToFavorite} =
  citySlicer.actions;

export default citySlicer.reducer;