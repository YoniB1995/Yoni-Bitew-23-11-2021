import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'

const CityCard = ({details}) => {
  const {Value , Unit} = details.current.Temperature.Metric;
   
    return (
        <div>
        <CardBody>
        <Card border="primary" style={{ width: '18rem' }}>
    <Card.Header>{details.name}</Card.Header>
    <Card.Body>
      <Card.Title>{Value}°{Unit}</Card.Title>
      <Card.Text>
         <small className="text-muted">{details.current.WeatherText}</small>
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