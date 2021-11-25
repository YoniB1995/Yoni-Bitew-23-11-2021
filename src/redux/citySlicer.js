import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from '../services/weatherApi'
import {SearchByLocationKey} from '../services/weatherApi'
import {telAvivCurrentCondition} from '../services/mockCityApi'

export const getCityByLocationKey = createAsyncThunk('city/getCityLocation', async (locationKey) => {
    return await fetch(`https://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=LKvJp99QBV1r1EtLGckCQqocK0zD2jgb`).then((res)=> res.json()).then(data=> data)
});
export const getCurrentWeather = createAsyncThunk('city/getCityLocation', async (locationKey) => {
    return await fetch(`${baseUrl}${locationKey}?apikey=LKvJp99QBV1r1EtLGckCQqocK0zD2jgb`).then((res)=> res.json()).then(data=> data)
});

const initialState = {
    cityDetails : {name:"Tel Aviv",temp:"23°C",locationKey:0},
    currentWeather:[],
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
        [getCurrentWeather.pending] : (state, action) => {
            state.status = 'loading'
        },
        [getCurrentWeather.fulfilled] : (state, {payload}) => {
            state.currentWeather = payload
            state.status = 'success'
        },
        [getCurrentWeather.rejected] : (state, action) => {
            state.status = 'failed'
        },

    }
    });

export const { getCityDetails,ChangedToFavorite} =
  citySlicer.actions;

export default citySlicer.reducer;