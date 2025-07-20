import { useGame } from '../Context/GeneralContext.jsx';

export default function Tile(props) {
    const { toggle, allRevealed } = useGame();

    const tileClasses = [
        'relative transition-all duration-500 ease-in-out transform',
        'border border-white rounded',
        'flex items-center justify-center',
        'cursor-pointer',
        'aspect-square w-full h-full', // Use full available space
        props.selected || allRevealed ? 'clicked' : 'bg-blue-300',
        props.won ? 'bg-black pointer-events-none won clicked sparkle' : '',
    ].join(' ');

    const imgClasses = [
        'absolute w-full h-full object-cover transition-opacity duration-500',
        props.selected || allRevealed ? 'opacity-100' : 'opacity-0'
    ].join(' ');

    return (
        <div
            className={`tile ${tileClasses}`}
            onClick={() => !props.won && toggle(props.id, props.num)}
        >
            <img 
                src={props.src}
                alt=""
                className={imgClasses}
            />
        </div>
    );
}