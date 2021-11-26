import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from '../services/weatherApi'

export const getCityByLocationKey = createAsyncThunk('city/getCityLocation', async (locationKey) => {
    return await fetch(`https://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=SZ8tjvSP35r99GtvKx2hEnHYhDnlZldh`).then((res)=> res.json()).then(data=> data)
});


const initialState = {
    cityDetails : {},
    isFavorite:false,
    status:null
}


const citySlicer = createSlice({
    name:"cityDetails",
    initialState,
    reducers:{
        getCityDetails(state,action){
            state.cityDetails = action.payload
            },
        addToFavorite(state,action){
            state.isFavorite = true
            }
        } ,
    extraReducers:{
        [getCityByLocationKey.pending] : (state, action) => {
            state.status = 'loading'
        },
        [getCityByLocationKey.fulfilled] : (state, {payload}) => {
            state.cityDetails = payload
            state.status = 'success'
        },
        [getCityByLocationKey.rejected] : (state, action) => {
            state.status = 'failed'
        },

    }
    });

export const { getCityDetails,addToFavorite} =
  citySlicer.actions;

export default citySlicer.reducer;