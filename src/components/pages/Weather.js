import React, {useState,useEffect} from 'react'
// import {apiKey,baseUrl,autoComplete} from '../../services/weatherApi'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/favoritesSlice";
import { getCityByLocationKey,ChangedToFavorite } from "../../redux/citySlicer";
// import { getCurrentWeather} from "../../redux/cityWeatherSlice";
import { getDailyForecast } from "../../redux/weekSlice";
import {daysWeek} from '../../services/mockCityApi'
import {getAutoComplete, getCurrentLocation,getCurrentWeather} from '../../services/weatherApi'
import DailyWeather from '../features/card/DailyWeather';
import CityCard from '../features/card/CityCard';


const Weather = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
    dispatch(getDailyForecast());
  }, [dispatch]);

    const [weatherDetails,setWeatherDetails] = useState([]);
    // const [showDays,setShowDays] = useState(false);
    const [week,setWeek] = useState([])
    const [key,setKey] = useState("");
    const [suggestions,setSuggestions] = useState([]);
    const [currentWeather,setCurrentWeather] = useState([{WeatherText:"Tel Aviv",Temperature:{Metric:{Value:"50",Unit:"C"}}}]);
    const [text,setText] = useState("");

    const getCity = useSelector((state) => state.city);
    const { cityDetails, isFavored, status, error } = getCity;
    

    const getFiveDays = useSelector((state) => state.dailyForecast);

    const { dailyForecast } = getFiveDays;

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
    
    const getCityLocation =  () => {
        console.log(cityDetails)
        

    }

    const handleAddFavorite = (product) => {
    dispatch(addToFavorites(product));
    dispatch(ChangedToFavorite())
  };

  const getMyLocation = async ()=>{
       const successCallback = async (position) => {
        getCurrentLocation(position.coords.latitude,position.coords.longitude)
          .then(async function(data) { 
            dispatch(getCityByLocationKey(data.Key));
            getCurrentWeather(data.Key).then((details)=>setCurrentWeather(details) )
          })    
  }
//   dispatch(getCurrentWeather("212479"));
  const errorCallback = (error) => {
    console.log(error)
  };
navigator.geolocation.getCurrentPosition(successCallback , errorCallback)
  }


    return (
        <WeatherPageBody className="animate__animated animate__fadeInDown">
            <h2>Weather</h2>
            <span><button onClick={getCityLocation}><i class="fas fa-search"></i></button>
            <input type="text"  placeholder="city..." onChange={(e) => onChangeHandler(e.target.value)}
            value={text}
             onBlur={()=> {
                setTimeout(()=> {
                    setSuggestions([])
                }, 100)
            }}
            /> <button onClick={getMyLocation}>My Location <i class="fa fa-map-marker" aria-hidden="true"></i></button>
            </span>
            {suggestions && suggestions.map((suggestion,i)=> {
                return <OptionsList key={i} onClick={()=> onSuggestHandler(suggestion.LocalizedName)}>{suggestion.LocalizedName}</OptionsList>
            })}

             

            {/* {showDays && weatherWeek?.DailyForecasts.map((oneDay,i)=> 
                <DailyWeather key={i} num={i} title={oneDay.Day.IconPhrase} maxWeather={oneDay.Temperature.Maximum} minWeather={oneDay.Temperature.Minimum}/>
            )} */}
             <WeatherBox >
            <WeatherBoxTop>
                <div><CityCard currentWeather={currentWeather} /></div>
                <div>Add To Favorites<button onClick={()=> handleAddFavorite(cityDetails)}>Add</button></div>
            </WeatherBoxTop>
            <WeatherBoxCenter>
                <h1>{currentWeather[0].WeatherText}</h1>
            </WeatherBoxCenter>
           <WeatherBoxBottom>
               {dailyForecast.map((day,i)=> 
<DailyWeather key={i} temp={day.Temperature.Minimum} desc={day.Day.IconPhrase} currentDay={daysWeek[i]}/>
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


`