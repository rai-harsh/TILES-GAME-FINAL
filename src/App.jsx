import React from 'react';
import './styling/App.css';
import './styling/Tiles.css';
import Tile from './tile.jsx';
import WinScreen from './WinScreen.jsx';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { GameProvider, useGame } from './Context/GeneralContext.jsx';
function App() {

  const {
    gameWon,
    completeGame,
    moveCount,
    toggle,
    initTiles,
    setAllRevealed,
    animationTiming,
    hint
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
      />
    )
  });

  return (

    <div className='MainPage'>
      {
        (gameWon) ? (
          <>
            <Confetti width={width} height={height} numberOfPieces={500} />
            <WinScreen count={moveCount} />
          </>
        ) :
          (
            <>
              <h1 className='score'>Moves taken: {moveCount}</h1>
              <button onClick={()=> hint()}>HINT</button>
              <div className='tiles'>{tiles}</div>
            </>
          )
      }
    </div>
  )
}

export default function WrappedApp() {
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
}