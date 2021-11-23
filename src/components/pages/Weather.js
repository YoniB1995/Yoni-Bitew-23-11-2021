import React, {useState} from 'react'
import {apiKey,baseUrl,autoComplete} from '../services/weatherApi'
import styled from 'styled-components'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import FormControl from 'react-bootstrap/FormControl'
const Weather = () => {
    const [weatherDetails,setWeatherDetails] = useState([]);
    const [cityInput,setCityInput] = useState();
    const [suggestions,setSuggestions] = useState();
    const [text,setText] = useState("");

    const getWeatherDetails = async (id) => {
        const query = `${id}?apikey=${apiKey}`

        const res = await fetch(`${baseUrl}${query}`);
        const data = await res.json();
        return data[0];
    }
    const getAutoComplete = async (city) => {
        const query = `?apikey=${apiKey}&q=${city}`

        await fetch(`${autoComplete}${query}`).
        then((res) => res.json())
        .then((data) => setWeatherDetails(data))
        
    }

    const onChangeHandler = async (location) => {
        await getAutoComplete(cityInput);
        let matches = [];
        if (location.length > 0) {
            matches = weatherDetails.filter( city => {
                const regex = new RegExp(`${text}`, "gi");
                return city.LocalizedName.match(regex)
            })
        }
        console.log('matches',matches)
        setSuggestions(matches)
        setText(location)
    }
    const getDetails = () => {

    }



    return (
        <WeatherPageBody>
            <h2>Weather</h2>
            <span><button onClick={getDetails}><i class="fas fa-search"></i></button><input type="text" placeholder="city..." onChange={(e) => onChangeHandler(e.target.value)}/> </span>
            {suggestions && suggestions.map((suggestion,i)=> {
                return <OptionsList key={i}>{suggestion.LocalizedName}</OptionsList>
            })}
           
        </WeatherPageBody>
    )
}

export default Weather


const WeatherPageBody = styled.div` 
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