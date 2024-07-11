import React, { useState, useEffect } from 'react';
import './styling/Tiles.css';

export default function Tile(props)
{
    const [isInitiallyClicked, setIsInitiallyClicked] = useState(true);
    
    useEffect(() => {
    const timer = setTimeout(() => {
        setIsInitiallyClicked(false);
      }, 3000); // 3 seconds

      // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
    }, []);
    
    let color, todo;
    if(props.won==true){    
        color = "won clicked sparkle"; 
    }
    else{
        color =  (props.selected || isInitiallyClicked) ? "clicked" : "";
        todo = ()=>{props.handleClick()};   
    }
    
    return(
    <div  className={`tile ${color}`} onClick={todo}  >
        <img src ={props.src} />
    </div>
)
}