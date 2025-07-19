import './styling/Tiles.css';
import { useGame } from './Context/GeneralContext.jsx';

export default function Tile(props) {
    const { toggle, allRevealed } = useGame();

    let color;
    if (props.won == true) {
        color = "won clicked sparkle";
    }
    else {
        color = (props.selected || allRevealed ) ? "clicked" : "";
    }

    return (
        <div className={`tile ${color}`} onClick={()=> toggle(props.id, props.num)}  >
            <img src={props.src} />
        </div>
    )
}