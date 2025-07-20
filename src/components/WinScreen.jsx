import { useState } from 'react';
import { useGame } from '../Context/GeneralContext';
export default function WinScreen(props){
    const { reset} = useGame();
    const[Reset,SetReset]=useState(false)
        function resetGame(){
            SetReset(!Reset);
            setTimeout(() => {
                reset();
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
                <button className="glow-on-hover" type="button" onClick={resetGame}>New Game</button>
            </>
            :
            <div className='loader'></div>
            }
        </div>
    )
}
