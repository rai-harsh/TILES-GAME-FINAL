import React, { useState, useEffect } from 'react';
import './styling/App.css';
import 'animate.css';

export default function WinScreen(props){
    const[Reset,SetReset]=useState(false)
        function reset(){
            SetReset(!Reset);
            setTimeout(() => {
                props.handleClick();
                SetReset(!Reset);
            }, 2000);
        }
    return(
        
        <div className={`winScreen animated-div ${Reset && "centered"}`}>
            {
            !Reset ?
            <>
                <h1 >Game won </h1>
                <h3>Moves taken : {props.count}</h3>
                <button class="glow-on-hover" type="button" onClick={reset}>New Game</button>
            </>
            :
            <div className='loader'></div>
            }
        </div>
    )
}
