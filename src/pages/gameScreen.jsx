import React from 'react';
import Tile from '../components/tile.jsx';
import WinScreen from '../components/WinScreen.jsx';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { GameProvider, useGame } from '../Context/GeneralContext.jsx';
export default function GameScreen() {
    const {
        gameWon,
        completeGame,
        moveCount,
        toggle,
        initTiles,
        setAllRevealed,
        animationTiming,
        hint,
        allRevealed
    } = useGame();

    React.useEffect(() => {
        function checkGameWon(item) {
            return item.won == false
        }
        const leftTobeWon = initTiles.filter(checkGameWon);
        if (leftTobeWon.length == 0) {
            completeGame();
        }
    }, [initTiles]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setAllRevealed(false);
        }, animationTiming.INITIAL_REVEAL); // 3 seconds

        // Cleanup the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, [gameWon]);

    // Calculate grid columns based on number of tiles
    const gridCols = Math.ceil(Math.sqrt(initTiles?.length));
    const tileSize = `min(6vw, 80px)`; // Responsive tile size
    //Confetti
    const { width, height } = useWindowSize()

    const tiles = initTiles.map((item) => {
        return (
            <Tile
                key={item.id}
                id={item.id}
                selected={item.selected}
                won={item.won}
                num={item.num}
                handleClick={() => toggle(item.id, item.num)}
                src={item.img}
                ize={tileSize}
            />
        )
    });

    return (
        <div className="min-h-screen bg-[rgb(0,0,75)] flex flex-col items-center justify-center p-4 select-none overflow-x-hidden">
            {gameWon ? (
                <>
                    <Confetti width={width} height={height} numberOfPieces={500} />
                    <WinScreen count={moveCount} />
                </>
            ) : (
                <>
                    <div className="w-full max-w-[90vw] mx-auto"> {/* More flexible container */}
                        <div className="flex flex-col items-center mb-4 sm:mb-6">
                            <h1 className="text-blue-100 text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
                                Moves Taken: {moveCount}
                            </h1>

                            <button
                                className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-200 shadow-md ${allRevealed || gameWon
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                    } text-white`}
                                disabled={allRevealed || gameWon}
                                onClick={hint}
                            >
                                HINT
                            </button>
                        </div>

                        <div className="w-full overflow-clip px-2 py-1"> {/* Scrollable container */}
                            <div
                                className="grid gap-2 sm:gap-3 mx-auto"
                                style={{
                                    gridTemplateColumns: `repeat(${gridCols}, minmax(2.5rem, min(5rem, 10vw)))`, // Dynamic sizing
                                    width: 'fit-content' // Only take needed space
                                }}
                            >
                                {tiles}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

