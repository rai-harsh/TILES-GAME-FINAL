import { createContext, useState, useEffect, useContext } from "react";
import React from "react";

import initialTiles from "../squareDB.js";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setmoveCount] = useState(0);
  const [initTiles, setInitTiles] = React.useState(initialTiles);
  const [selected, setSelected] = React.useState([]);
  const [animationTiming, setAnimationTiming] = React.useState(
    {
      FLIP_DELAY: 400,  // ms
      INITIAL_REVEAL: 1000,
      HINT_INTERVAL: 1000
    })
  const [allRevealed, setAllRevealed] = React.useState(true)

  const completeGame = () => {
    setGameWon(true);
  }

  const incrementMoveCount = () => {
    setmoveCount(prevCount => prevCount + 1)
  }

  const hint = () => {
    // Don't allow hints when tiles are already revealed
    if (allRevealed) return;

    // Reveal all tiles temporarily
    setAllRevealed(true);

    // Set timeout to hide them again after 2 seconds
    const hintTimer = setTimeout(() => {
      setAllRevealed(false);
    }, animationTiming.HINT_INTERVAL);

    return () => clearTimeout(hintTimer); // Cleanup
  };

  function toggle(id, num) {
    // calling the selection function that pushes the tile number inside the array
    if(allRevealed) return;
    setInitTiles((prevTile) => {
      return prevTile.map((item) => {
        return item.id === id ? { ...item, selected: !item.selected } : item;
      })
    })
    selection(id, num);
  }

  const selection = (id, num) => {
    // if its the first tile selected
    if (selected.length == 0) {
      console.log(`first- id: ${id} num: ${num}`)
      setSelected((prevSelection) => [...prevSelection, { number: num, id: id }]); // Pushes num of the selected object inside array
      incrementMoveCount();
      return;
    }
    // if  its the second tile clicked and is not the same as the first one
    else if (selected[0].number == num && selected[0].id != id) {
      console.log(`second- id: ${id} num: ${num}`)
      setSelected((prevSelection) => []);
      win(id, selected[0].id)
      clean();
      incrementMoveCount();
      return;
    }
    else {
      console.log(`second- id: ${id} num: ${num}`)
      if (selected[0].number != num) {
        // tile mismatch case
        incrementMoveCount();
      }
      setSelected((prevSelection) => []);
      setTimeout(() => {
        clean();
      }, animationTiming.FLIP_DELAY);
    }
  }

  function win(id1, id2) {
    setInitTiles((prevTile) => {
      return prevTile.map((item) => {
        return (item.id == id1 || item.id == id2) ? { ...item, won: !item.won } : item;
      })
    })
  }

  function clean() {
    setInitTiles((prevTile) => {
      return prevTile.map((item) => {
        return item.selected == true ? { ...item, selected: !item.selected } : item;
      })
    })

  }

  function reset() {
    setInitTiles((prevTile) => {
      return prevTile.map((tile) => {
        return { ...tile, won: false }
      })
    })
    setGameWon(false);
    setmoveCount(0);
    setSelected([]);
    setAllRevealed(true)
  }
  const value = {
    gameWon,
    completeGame,
    moveCount,
    toggle,
    initTiles,
    selection,
    reset,
    animationTiming,
    setAnimationTiming,
    selection,
    allRevealed,
    setAllRevealed,
    hint
  }
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}