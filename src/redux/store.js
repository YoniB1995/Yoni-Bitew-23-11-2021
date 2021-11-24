import { configureStore } from '@reduxjs/toolkit';
import favoritesSlicer from './favoritesSlice'
import citySlicer from './citySlicer'
import weekSlice from './weekSlice';


export const store = configureStore({
  reducer: {
    city:citySlicer,
    dailyForecast:weekSlice,
   favorites: favoritesSlicer
  },
});
