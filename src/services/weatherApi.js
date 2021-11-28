export const apiKey = process.env.REACT_APP_WEATHER_API_KEY


export const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/" //current weather
export const SearchByLocationKey = "http://dataservice.accuweather.com/locations/v1/"
export const fiveDaysForcast = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
export const autoComplete = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete"
export const currentLocation = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search"

export const getAutoComplete = async (city) => {
        const query = `?apikey=${apiKey}&q=${city}`

        const fetchAuto =  await fetch(`${autoComplete}${query}`)
        .then((res) => res.json())

        return fetchAuto;
        
    }

export const getDaysForecast = async (locationApi) => {
        const query = `${locationApi}?apikey=${apiKey}`

        const fetchDays =  await fetch(`${fiveDaysForcast}${query}`)
        .then((res) => res.json())

        return fetchDays;
        
    }

export const getCurrentLocation = async (lat,lon) => {
    const query = `?apikey=${apiKey}&q=${lat}%2C${lon}`;

    const myLocation = await fetch(`${currentLocation}${query}`)
    .then((res) => res.json())

    return myLocation;
}

export const getCurrentWeather = async (locationKey) => {
    return await fetch(`${baseUrl}${locationKey}?apikey=${apiKey}`).then((res)=> res.json());
}

export const addToFavoritesByKey =  async (locationKey) => {
    return await fetch(`${baseUrl}${locationKey}?apikey=${apiKey}`).then((res)=> res.json())
};
