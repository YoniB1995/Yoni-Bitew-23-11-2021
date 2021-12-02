export const apiKey = process.env.REACT_APP_WEATHER_API_KEY 


export const baseUrl = "https://dataservice.accuweather.com/currentconditions/v1/" //current weather
export const SearchByLocationKey = "https://dataservice.accuweather.com/locations/v1/"
export const fiveDaysForcast = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"
export const autoComplete = "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"
export const currentLocation = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search"

export const getAutoComplete = async (city) => {
    return await fetch(`${autoComplete}?apikey=${apiKey}&q=${city}`).then((res) => res.json())
    }

export const getDaysForecast = async (locationApi) => {
    return await fetch(`${fiveDaysForcast}${locationApi}?apikey=${apiKey}`).then((res) => res.json())    
    }

export const getCurrentLocation = async (lat,lon) => {
    return await fetch(`${currentLocation}?apikey=${apiKey}&q=${lat}%2C${lon}`).then((res) => res.json())
}

export const getCurrentWeather = async (locationKey) => {
    return await fetch(`${baseUrl}${locationKey}?apikey=${apiKey}`).then((res)=> res.json());
}

export const addToFavoritesByKey =  async (locationKey) => {
    return await fetch(`${baseUrl}${locationKey}?apikey=${apiKey}`).then((res)=> res.json())
};
