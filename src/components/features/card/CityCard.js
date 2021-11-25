import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import { useSelector } from "react-redux";

const CityCard = () => {
  // const {Value , Unit} = details.current.Temperature.Metric;
   const getTheme = useSelector((state) => state.theme);
const getCity = useSelector((state) => state.city);
    
        const { cityDetails, isFavored, status, error } = getCity;

    const {bg,text } = getTheme;
    return (
        <div>
        <CardBody className="animate__animated animate__fadeInDown">
        <Card border="primary" bg={bg} text={text} style={{ width: '18rem' }}>
    <Card.Header>Testing Name</Card.Header>
    <Card.Body>
      <Card.Title>Value°Unit</Card.Title>
      <Card.Text>
         <small className="text-muted">Hello World</small>
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