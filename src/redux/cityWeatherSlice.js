import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from '../services/weatherApi'


export const getCurrentWeather = createAsyncThunk('city/getCityLocation', async (locationKey) => {
    return await fetch(`${baseUrl}${locationKey}?apikey=83yfOAJNfGjIHsfFSarM7IGmIH8W8KlS`).then((res)=> res.json()).then(data=> data)
});

const initialState = {
    currentWeather:[{WeatherText:"Tel Aviv",Temperature:{Metric:{Value:15,Unit:"C"}}}],
    isFavored:false,
    status:null
}


const cityWeatherSlice = createSlice({
    name:"currentWeather",
    initialState,
    extraReducers:{
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

// export const { getCityDetails,ChangedToFavorite} =
//   cityWeatherSlice.actions;

export default cityWeatherSlice.reducer;