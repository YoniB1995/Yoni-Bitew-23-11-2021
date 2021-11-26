import React, {useState,useEffect} from 'react'
import {  useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites,addWeatherLocationKey,removeFromFavorites } from "../../redux/favoritesSlice";
import { getCityByLocationKey, addToFavorite, removeFavorite } from "../../redux/citySlicer";
import { getDailyForecast } from "../../redux/weekSlice";
import {daysWeek} from '../../services/mockCityApi'
import {getAutoComplete, getCurrentLocation,getCurrentWeather,addToFavoritesByKey} from '../../services/weatherApi'
import DailyWeather from '../features/card/DailyWeather';
import CityCard from '../features/card/CityCard';


const Weather = () => {
    const cityParams = useParams();
    useEffect(()=> {
      
      if(cityParams.id) {
        dispatch(getDailyForecast(cityParams.id))
       dispatch(getCityByLocationKey(cityParams.id))
      } 
    },[cityParams])
    const dispatch = useDispatch();
    const getCity = useSelector((state) => state.city);
    const { cityDetails,isFavorite} = getCity;
    const getFiveDays = useSelector((state) => state.dailyForecast);
    const { dailyForecast,status } = getFiveDays;
    const list = useSelector((state) => state.favorites);
    

    
    useEffect(() => {
    if (!cityDetails.LocalizedName){
       dispatch(getDailyForecast("215854"))
       dispatch(getCityByLocationKey("215854"))
    }
  }, [dispatch]);

    const [weatherDetails,setWeatherDetails] = useState([]);
    const [convert,setConvert] = useState(false)
    const [key,setKey] = useState("");
    const [suggestions,setSuggestions] = useState([]);
    const [currentWeather,setCurrentWeather] = useState([{WeatherText:"Tel Aviv",desc:"Very Sunny",Temperature:{Metric:{Value:"62",Unit:"F"},Imperial:{Value:"17",Unit:"C"}}}]);
    const [text,setText] = useState("");

    

    const onSuggestHandler = async (text) => {
        setText(text);
        await getAutoComplete(text).then((data) => console.log(data))
        setSuggestions([]);
    }

    const onChangeHandler = async (location) => {
        await getAutoComplete(location).then((data) => setWeatherDetails(data))
        let matches = [];
        if (location.length > 0) {
            matches = await weatherDetails.filter( city => {
                const regex = new RegExp(`${text}`, "gi");
                return city.LocalizedName.match(regex)
            })
        }
        setSuggestions(matches)
        setText(location)
    }
  const {favoriteWeather} = list;

    const handleAddFavorite = (city) => {
    dispatch(addToFavorites(city));
    addToFavoritesByKey(city.Key).then((data)=> dispatch(addWeatherLocationKey(data)))
    dispatch(addToFavorite())
    
  };

  const handleRemoveFavorite = (city) => {
    dispatch(removeFromFavorites(city));
    dispatch(removeFavorite())
  };

  const getLog = ( )=> {
    console.log(favoriteWeather)
    console.log(favoriteWeather["0"]["0"])
  }

  const getMyLocation = async ()=>{
       const successCallback = async (position) => {
        getCurrentLocation(position.coords.latitude,position.coords.longitude)
          .then( function(data) { 
            dispatch(getCityByLocationKey(data.Key));
            getCurrentWeather(data.Key).then((details)=>setCurrentWeather(details) )
            dispatch(getDailyForecast(data.Key))
            dispatch(removeFavorite())
          })
  }

  const errorCallback = (error) => {
    console.log(error)
  };
navigator.geolocation.getCurrentPosition(successCallback , errorCallback)
  }

  if (status === "loading") {
    return <LoadingPageBody ><h3>Loading...</h3></LoadingPageBody>;
  }

    return (
        <WeatherPageBody className="animate__animated animate__fadeInDown">
            <h2>Type your destination</h2>
            <span style={{display:"flex",flexDirection:"row"}}><Button variant="primary" onClick={getLog}><i class="fas fa-search"></i></Button>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e) => onChangeHandler(e.target.value)}
            value={text} />
            {/* <input type="text"  placeholder="city..." onChange={(e) => onChangeHandler(e.target.value)}
            value={text}
             onBlur={()=> {
                setTimeout(()=> {
                    setSuggestions([])
                }, 100)
            }}
            />  */}
            <Button variant="primary" style={{marginLeft:"5px"}} onClick={getMyLocation}>My Location <i class="fa fa-map-marker" aria-hidden="true"></i></Button>
            
            </span>
            {suggestions && suggestions.map((suggestion,i)=> {
                return <OptionsList key={i} onClick={()=> onSuggestHandler(suggestion.LocalizedName)}>{suggestion.LocalizedName}</OptionsList>
            })}


             <WeatherBox >
            <WeatherBoxTop>
                <div><CityCard currentWeather={currentWeather} isConverted={convert} /></div>
                <div>
                  <Button variant="outline-primary" style={{marginRight:"5px"}} onClick={()=>!convert ? setConvert(true) : setConvert(false)}>Convert °C/°F</Button>
                   {isFavorite === true ? 
                   <Button variant="outline-danger" onClick={()=> handleRemoveFavorite(cityDetails)}>Remove from Favorites</Button> :
                   <Button variant="outline-success"  onClick={()=> handleAddFavorite(cityDetails)}>Add to Favorites</Button> }
                </div>
                
            </WeatherBoxTop>
            <WeatherBoxCenter>
                <h1>Very Sunny</h1>
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