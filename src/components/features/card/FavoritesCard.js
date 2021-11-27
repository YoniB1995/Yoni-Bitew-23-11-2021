import React from 'react'
import {Link,useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import {useSelector} from 'react-redux'
const FavoritesCard = ({city,desc,celsius,cityKey}) => {
  const navigate = useNavigate ();
  
  const getTheme = useSelector((state) => state.theme);
  const { bg,text } = getTheme;
    return (
        <CardBody>
        <Card bg={bg} text={text}>
    <i class="fas fa-star" style={{color:"gold"}}></i>
    <Card.Body>
      <Card.Title>{city}</Card.Title>
      <Card.Text>
        {Math.floor(celsius.Metric.Value)}°{celsius.Metric.Unit}
      </Card.Text>
      <Card.Text>
        <Button variant="primary" onClick={()=> navigate(`/${cityKey}`)}>Get Details</Button>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{desc}</small>
    </Card.Footer>
  </Card>
  </CardBody>
    )
}

export default FavoritesCard


const CardBody = styled.div` 
display:flex;
margin:1rem;
color:black;
`
