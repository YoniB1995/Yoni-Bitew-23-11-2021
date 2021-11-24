import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'

const FavoritesCard = ({title,itemId}) => {
    return (
        <CardBody>
        <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{itemId}</small>
    </Card.Footer>
  </Card>
  </CardBody>
    )
}

export default FavoritesCard


const CardBody = styled.div` 
display:flex;
margin:1rem;
width:30%;
color:black;
`
