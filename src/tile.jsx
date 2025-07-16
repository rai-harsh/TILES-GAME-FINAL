import { useState, useEffect } from 'react';
import './styling/Tiles.css';
import { useGame } from './Context/GeneralContext.jsx';

export default function Tile(props) {
    const { toggle } = useGame();
    const [isInitiallyClicked, setIsInitiallyClicked] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitiallyClicked(false);
        }, 3000); // 3 seconds

        // Cleanup the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    let color, todo;
    if (props.won == true) {
        color = "won clicked sparkle";
    }
    else {
        color = (props.selected || isInitiallyClicked) ? "clicked" : "";
        todo = () => { toggle(props.id, props.num) };
    }

    return (
        <div className={`tile ${color}`} onClick={todo}  >
            <img src={props.src} />
        </div>
    )
}