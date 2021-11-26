import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import { useSelector } from "react-redux";

const CityCard = ({currentWeather}) => {
  // const {Value , Unit} = details.current.Temperature.Metric;
   const getTheme = useSelector((state) => state.theme);
// const getCity = useSelector((state) => state.city);
    
//         const { currentWeather, cityDetails, isFavored, status, error } = getCity;
// const getWeather = useSelector((state) => state.currentWeather);
//     const { currentWeather } = getWeather;
    const {bg,text } = getTheme;
    return (
        <div>
        <CardBody className="animate__animated animate__fadeInDown">
        <Card border="primary" bg={bg} text={text} style={{ width: '18rem' }}>
    <Card.Header>{currentWeather[0].WeatherText?currentWeather[0].WeatherText : "Header" }</Card.Header>
    <Card.Body>
      <Card.Title>{currentWeather[0].Temperature.Metric.Value ? currentWeather[0].Temperature.Metric.Value : "NOPE" }°{currentWeather[0].Temperature.Metric.Unit ? currentWeather[0].Temperature.Metric.Unit : "none"}</Card.Title>
      <Card.Text>
         <small className="text-muted">{currentWeather[0].WeatherText?currentWeather[0].WeatherText : "Header"}</small>
      </Card.Text>
    </Card.Body>
  </Card>
  </CardBody>
        </div>
    )
}

export default CityCard


const CardBody = styled.div` 
display:flex;
color:black;
margin:1rem;
`