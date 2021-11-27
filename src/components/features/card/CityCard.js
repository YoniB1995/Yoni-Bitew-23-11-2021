import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import { useSelector } from "react-redux";

const CityCard = ({isConverted}) => {
  const getTheme = useSelector((state) => state.theme);
const getCity = useSelector((state) => state.city);
    
  const {  cityDetails,currentCondition } = getCity;
  const {Metric,Imperial} = currentCondition["0"].Temperature
  const convertedWeather = !isConverted? Math.floor(Metric.Value) +"°" +Metric.Unit : Math.floor(Imperial.Value)+ "°" +Imperial.Unit;
    const {bg,text } = getTheme;
    return (
        <div>
        <CardBody className="animate__animated animate__fadeInDown">
        <Card border="primary" bg={bg} text={text} style={{ width: '18rem' }}>
    <Card.Header>{cityDetails.LocalizedName}</Card.Header>
    <Card.Body>
      <Card.Title>
      {convertedWeather}
      </Card.Title>
      <Card.Text>
         <small className="text-muted">{currentCondition["0"].WeatherText}</small>
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