import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

export const getDailyForecast = createAsyncThunk('weather/getDailyForecast', async (locationKey) => {
    return await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/212479?apikey=83yfOAJNfGjIHsfFSarM7IGmIH8W8KlS").then((res)=> res.json()).then((data) => data.DailyForecasts)
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