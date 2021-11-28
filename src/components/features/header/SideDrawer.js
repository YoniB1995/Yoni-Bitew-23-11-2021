import React, { useState } from "react";
import "./SideDrawer.css";
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import {Link} from 'react-router-dom'
import './Header.css'
import { changeTheme ,backToDefault} from "../../../redux/themeSlicer";



const SideDrawer = ({ show, click }) => {
    const getTheme = useSelector((state) => state.theme);
  const {theme} = getTheme;
  const sideDrawerClass = ["sidedrawer"];
  show && sideDrawerClass.push("show");
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
    <div className={sideDrawerClass.join(" ")} style={theme}>
        <span><p >Weather Task </p> <img src="./images/rainy-1.svg" alt="Kiwi standing on oval" height="100px" width="100px"/></span>
        <img src="./images/abraLogo.jpeg" alt="Abra Company Logo" />
      <p style={{fontSize:"1rem",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>Change Theme
                <label class="switch" >
                    <input type="checkbox"/>
                    <span class="slider round" onClick={toggleTheme}></span>
                </label>
            </p>
            <BtnNavigate>
        <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <Link to="/"><ToggleButton id="tbg-btn-1" value={1} style={{fontSize:"1.5rem",color:"white",background:"#141414",textDecoration:"none"}}>
        Home</ToggleButton>
        </Link>
      <Link to="/favorites"><ToggleButton id="tbg-btn-2" value={2} style={{fontSize:"1.5rem",color:"white",background:"#141414"}}>
        Favorites</ToggleButton>
        </Link>
    </ToggleButtonGroup></BtnNavigate>
    </div>
  );
};

export default SideDrawer;


const BtnNavigate = styled.div` 
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`