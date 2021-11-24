import React,{useEffect} from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'

const DailyWeather = ({temp,desc,currentDay}) => {
  const {Value , Unit} = temp;
   
    return (
        <div>
             <CardBody>
        <Card>
    <Card.Img variant="top" src="https://www.accuweather.com/images/weathericons/2.svg" height="100px" width="100px" />
    <Card.Body>
      <Card.Title>{currentDay}</Card.Title>
      <Card.Text>
        {Value}°{Unit}
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