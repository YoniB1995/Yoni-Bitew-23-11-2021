import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme : {background:"#f4f4f4",color:"black"},
    bg : "white",
    text : "dark"
}


const themeSlicer = createSlice({
    name:"theme",
    initialState,
    reducers:{
         changeTheme(state,action){
            state.theme = {background:"#141414",color:"white"};
            state.bg ="dark";
            state.text="white";
            },
        backToDefault(state,action){
            state.theme = {background:"#f4f4f4",color:"black"};
            state.bg = "white";
            state.text = "dark";
            },
        
        }}    
  );

export const { changeTheme,backToDefault} =
  themeSlicer.actions;

export default themeSlicer.reducer;