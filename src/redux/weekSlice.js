import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {fiveDaysForcast,apiKey} from '../services/weatherApi'

export const getDailyForecast = createAsyncThunk('weather/getDailyForecast', async (locationKey) => {
    return await fetch(`${fiveDaysForcast}${locationKey}?apikey=${apiKey}`).then((res)=> res.json()).then((data) => data.DailyForecasts)
});

const initialState = {
    dailyForecast:[],
    converted: [],
    status: null,
}

const weekSlicer = createSlice({
    name:"dailyForecast",
    initialState,
    extraReducers:{
        [getDailyForecast.pending] : (state, action) => {
            state.status = 'loading'
        },
        [getDailyForecast.fulfilled] : (state, {payload}) => {
            state.dailyForecast = payload
            state.status = 'success'
        },
        [getDailyForecast.rejected] : (state, action) => {
            state.status = 'failed'
        },

    },
})


export default weekSlicer.reducer;