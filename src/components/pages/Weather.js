import React, {useState,useEffect} from 'react'
import {  useParams,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites,addWeatherLocationKey,removeFromFavorites } from "../../redux/favoritesSlice";
import { getCityByLocationKey, getCurrentCondition } from "../../redux/citySlicer";
import { getDailyForecast } from "../../redux/weekSlice";
import {daysWeek} from '../../services/mockCityApi'
import {getAutoComplete, getCurrentLocation,getCurrentWeather,addToFavoritesByKey} from '../../services/weatherApi'
import DailyWeather from '../features/card/DailyWeather';
import CityCard from '../features/card/CityCard';


const Weather = () => {
    const navigate = useNavigate ();
    const cityParams = useParams();
    const dispatch = useDispatch();
    const getCity = useSelector((state) => state.city);
    const { cityDetails , currentCondition,isLoading} = getCity;
    const getFiveDays = useSelector((state) => state.dailyForecast);
    const { dailyForecast,status } = getFiveDays;
    const list = useSelector((state) => state.favorites);
    const {favoriteItems} = list;
    const [text,setText] = useState("");

    useEffect(()=> {
      if(cityParams.id) {
        dispatch(getDailyForecast(cityParams.id))
       dispatch(getCityByLocationKey(cityParams.id))
      getCurrentWeather(cityParams.id).then((data)=> dispatch(getCurrentCondition(data))).catch((error)=> console.log(error))
       favoriteItems.map((favorite)=> favorite.Key === cityParams.id ? setFavor(true) : setFavor(false))
       console.log(favor)
      } 
      else {
        favoriteItems.map((favorite)=> favorite.LocalizedName === cityDetails.LocalizedName ? setFavor(true) : setFavor(false))
      }
    },[cityParams.id])

    
    useEffect(() => {
    if (!cityDetails.LocalizedName){
      getCurrentWeather("215854").then((details)=>dispatch(getCurrentCondition(details))).catch(error=> console.log(error))
       dispatch(getDailyForecast("215854"))
       dispatch(getCityByLocationKey("215854"))

    }
  }, [!cityDetails.LocalizedName]);

    const [weatherDetails,setWeatherDetails] = useState([]);
    const [convert,setConvert] = useState(false)
    const [favor,setFavor] = useState(false)
    const [suggestions,setSuggestions] = useState([]);

    

    const onSuggestHandler = async (text) => {
        setText(text);
        await getAutoComplete(text).then((data) => setWeatherDetails(data)).catch((error)=> console.log(error))
        setSuggestions([]);
    }

    const onChangeHandler = async (e) => {
      let searchInput = e.target.value
      let matches = [];
        await getAutoComplete(searchInput).then((data) => 
        {  
           if (searchInput.length > 0) {
            matches =  data
        }
        return matches;
        }).catch((error)=> console.log(error))
        
       
        setSuggestions(matches)
        setText(searchInput)
    }

    const handleAddFavorite = (city) => {
      setFavor(true)
    dispatch(addToFavorites(city));
    addToFavoritesByKey(city.Key).then((data)=> dispatch(addWeatherLocationKey(data))).catch((error)=> console.log(error))    
  };

  const handleRemoveFavorite = (city) => {
    setFavor(false)
    dispatch(removeFromFavorites(city));
  };

  const searchCityInput = ( )=> {
    navigate(`/${weatherDetails[0].Key}`)
  }

  const getMyLocation = async ()=>{
       const successCallback = async (position) => {
        getCurrentLocation(position.coords.latitude,position.coords.longitude)
          .then( function(data) { 
            dispatch(getCityByLocationKey(data.Key));
            getCurrentWeather(data.Key).then((details)=>dispatch(getCurrentCondition(details) ))
            dispatch(getDailyForecast(data.Key))
          }).catch((error)=> console.log(error))
  }

  const errorCallback = (error) => {
    console.log(error)
  };
navigator.geolocation.getCurrentPosition(successCallback , errorCallback)
  }

  if (status === "loading" || isLoading === "loading" || isLoading === "failed") {
    return <LoadingPageBody ><h3>Loading...</h3></LoadingPageBody>;
  }

    return (
        <WeatherPageBody className="animate__animated animate__fadeInDown">
            <h2>Type your destination</h2>
            <span style={{display:"flex",flexDirection:"row"}}><Button variant="primary" onClick={searchCityInput}><i class="fas fa-search"></i></Button>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={onChangeHandler}
            value={text} />
            <Button variant="primary" style={{marginLeft:"5px"}} onClick={getMyLocation}>My Location <i class="fa fa-map-marker" aria-hidden="true"></i></Button>
            
            </span>
            {suggestions && suggestions.map((suggestion,i)=> {
                return <OptionsList key={i} onClick={()=> onSuggestHandler(suggestion.LocalizedName)}>{suggestion.LocalizedName}</OptionsList>
            })}


             <WeatherBox >
            <WeatherBoxTop>
                <div>{isLoading === null || isLoading === "failed" ? <h2>Loading...</h2> :<CityCard  isConverted={convert} />}</div>
                <div>
                  <Button variant="outline-primary" style={{marginRight:"5px"}} onClick={()=>!convert ? setConvert(true) : setConvert(false)}>Convert °C/°F</Button>
                   {favor ? 
                   <Button variant="outline-danger" onClick={()=> handleRemoveFavorite(cityDetails)}>Remove from Favorites</Button> :
                   <Button variant="outline-success"  onClick={()=> handleAddFavorite(cityDetails)}>Add to Favorites</Button> }
                </div>
                
            </WeatherBoxTop>
            <WeatherBoxCenter>
                {isLoading === null || isLoading === "failed" ? <h3>Loading...</h3> : <h1>{currentCondition["0"].WeatherText} </h1>}
            </WeatherBoxCenter>
           <WeatherBoxBottom>
               {dailyForecast?.map((day,i)=> 
               <DailyWeather key={i} temp={day.Temperature.Minimum} desc={day.Day.IconPhrase} isConverted={convert} currentDay={daysWeek[i]}/>
               )}  
            </WeatherBoxBottom>
            </WeatherBox>
        </WeatherPageBody>
    )
}

export default Weather


const WeatherPageBody = styled.div` 
height:100%;
background: url('https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260') no-repeat center / cover;
  color: #fff;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
`
const LoadingPageBody = styled.div` 
height:100vh;
background: url('https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260') no-repeat center / cover;
  color: #fff;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
`

const OptionsList = styled.div` 
cursor:pointer;
border: 1px solid black;
:hover{
    background:"#141414"
}
`

const WeatherBox = styled.div` 
opacity:7;
margin:1rem;
padding:1rem;
border:1px solid black;
border-radius:15px;
height:80%;
width:80%;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`

const WeatherBoxTop = styled.div` 
display:flex;
justify-content:space-between;
flex-direction:row;
width:100%;

@media (max-width: 960px) {
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;
  }
`

const WeatherBoxCenter = styled.div` 
display:flex;
justify-content:center;
align-items:center;
flex-direction:row;
`
const WeatherBoxBottom = styled.div` 
display:flex;
justify-content:center;
flex-direction:row;
width:100%;
@media (max-width: 960px) {
    flex-wrap: wrap;
  }

`