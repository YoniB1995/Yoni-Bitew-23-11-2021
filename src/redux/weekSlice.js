import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {fiveDaysForcast} from '../services/weatherApi'
import {telAvivForecast} from '../services/mockCityApi'
export const getDailyForecast = createAsyncThunk('weather/getDailyForecast', async () => {
    return await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=nlNUyElAD2GF9SXgzOt3m8V3XZpy53j3").then((res)=> res.json()).then((data) => data.DailyForecasts)
});

const initialState = {
    dailyForecast:[],
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