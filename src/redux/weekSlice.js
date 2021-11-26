import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

export const getDailyForecast = createAsyncThunk('weather/getDailyForecast', async (locationKey) => {
    return await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=7RVjxHOlcH1jCtJpY2C8jA7rHvjpqaWJ`).then((res)=> res.json()).then((data) => data.DailyForecasts)
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