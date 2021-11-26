import { configureStore } from '@reduxjs/toolkit';
import favoritesSlicer from './favoritesSlice'
import citySlicer from './citySlicer' 
import cityWeatherSlice from './cityWeatherSlice' 
import weekSlice from './weekSlice';
import themeSlicer from './themeSlicer';


export const store = configureStore({
  reducer: {
    city:citySlicer,
    currentWeather:cityWeatherSlice,
    dailyForecast:weekSlice,
   favorites: favoritesSlicer,
   theme:themeSlicer
  },
});
