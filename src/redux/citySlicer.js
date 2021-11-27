import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from '../services/weatherApi'

export const getCityByLocationKey = createAsyncThunk('city/getCityLocation', async (locationKey) => {
    return await fetch(`https://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=qA7oG2AXKewo19jivmHw9STJlmUqpHLV`).then((res)=> res.json()).then(data=> data)
});


const initialState = {
    cityDetails : {},
    currentCondition:[],
    isLoading:null
}


const citySlicer = createSlice({
    name:"cityDetails",
    initialState,
    reducers:{
        getCityDetails(state,action){
            state.cityDetails = action.payload
            },
        getCurrentCondition(state,{payload}){
            state.currentCondition = {...payload};
        },
        } ,
    extraReducers:{
        [getCityByLocationKey.pending] : (state, action) => {
            state.isLoading = 'loading'
        },
        [getCityByLocationKey.fulfilled] : (state, {payload}) => {
            state.cityDetails = payload
            state.isLoading = 'success'
        },
        [getCityByLocationKey.rejected] : (state, action) => {
            state.isLoading = 'failed'
        },

    }
    });

export const { getCityDetails,addToFavorite, removeFavorite,getCurrentCondition} =
  citySlicer.actions;

export default citySlicer.reducer;