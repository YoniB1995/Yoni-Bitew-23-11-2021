import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import './Header.css'
import { changeTheme ,backToDefault} from "../../../redux/themeSlicer";


const Header = ({click}) => {
    const dispatch = useDispatch();
    const [isTheme,setIsTheme] = useState(false)
   
        const [value, setValue] = useState([1, 2]);
    const handleChange = (val) => setValue(val);

   const toggleTheme = () => {
        if (!isTheme){
        setIsTheme(true)
        dispatch(changeTheme())
        }
        else {
            setIsTheme(false)
        dispatch(backToDefault()) 
        }
   }
    return (
        <HeaderBody>
            <HeaderLeft><img src="./images/abraLogo.jpeg" alt="Abra Company Logo" />
            <p className="header-task">Weather Task </p> <img src="./images/rainy-1.svg" alt="Kiwi standing on oval"/>
            <p className="toggle" style={{fontSize:"1rem",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>Change Theme
                <label class="switch" >
                    <input type="checkbox"/>
                    <span class="slider round" onClick={toggleTheme}></span>
                </label>
            </p> </HeaderLeft>
            <HeaderRight> <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <Link to="/"><ToggleButton id="tbg-btn-1" value={1} style={{fontSize:"1.5rem",color:"white",background:"#141414",textDecoration:"none"}}>
        Home</ToggleButton>
        </Link>
      <Link to="/favorites"><ToggleButton id="tbg-btn-2" value={2} style={{fontSize:"1.5rem",color:"white",background:"#141414"}}>
        Favorites</ToggleButton>
        </Link>
      
    </ToggleButtonGroup></HeaderRight>
    
    <HamburgerMenu onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerMenu>
        </HeaderBody>
    )
}

export default Header


const HeaderBody = styled.div`
display:flex;
width:100%;
justify-content:space-between;
flex-direction:row;
border-bottom: 1px solid black;
box-shadow:2px 1px 1px 0px;
height:20vh;
padding:1rem;
font-size:2rem;
@media (max-width: 750px) {
    display: flex;
    justify-content: space-around;
    img {
     display:none
    }
    .toggle{
        display:none;
    }
    .header-task{
        display:none
    }
  }
`
const HeaderLeft = styled.div`
display:flex;
align-items:center;
flex-direction:row;
justify-content:center;

img {
    height:100%;
}
p{
    padding-left:1rem;
}

@media (max-width: 750px) {
    
    display:none
    
  }

`

const HeaderRight = styled.div`
display:flex;
flex-direction:row;
align-items:center;
@media (max-width: 750px) {
    display:none;
  }
`


const HamburgerMenu = styled.div`
  width: 30px;
  height: 30px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  div {
    width: 100%;
    height: 3px;
    background: blue;
  }

  @media (max-width: 750px) {
    display: flex;
    margin-top: 30px;
  }
`;