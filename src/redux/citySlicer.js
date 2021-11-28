import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {SearchByLocationKey,apiKey} from '../services/weatherApi'

export const getCityByLocationKey = createAsyncThunk('city/getCityLocation', async (locationKey) => {
    return await fetch(`${SearchByLocationKey}${locationKey}?apikey=${apiKey}`).then((res)=> res.json()).then(data=> data)
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

export const { getCityDetails,addToFavorite,getCurrentCondition} =
  citySlicer.actions;

export default citySlicer.reducer;