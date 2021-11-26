import React,{useEffect} from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import {useSelector} from 'react-redux'
const DailyWeather = ({temp,desc,currentDay,isConverted}) => {
  const getTheme = useSelector((state) => state.theme);
  const { bg,text } = getTheme;
  const {Value , Unit} = temp;
  const convertedWeather = !isConverted ? Value +"°"+Unit : Math.round(((Value - 32) * 5 / 9).toFixed(2))+"°C"
    return (
        <div>
             <CardBody >
        <Card bg={bg} text={text} >
    <Card.Img variant="top" src="https://www.accuweather.com/images/weathericons/2.svg" height="100px" width="100px" />
    <Card.Body>
      <Card.Title>{currentDay}</Card.Title>
      <Card.Text>
        {convertedWeather}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{desc}</small>
    </Card.Footer>
  </Card>
  </CardBody>
        </div>
    )
}

export default DailyWeather


const CardBody = styled.div` 
display:flex;
color:black;
margin:1rem;
`