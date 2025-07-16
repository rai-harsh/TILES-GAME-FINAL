import { createContext, useState, useContext } from "react";
import React from "react";

import initialTiles from "../squareDB.js";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setmoveCount] = useState(0);
  const [initTiles, setInitTiles] = React.useState(initialTiles);
  const [selected, setSelected] = React.useState([]);


  const resetGame = () => {
    setGameWon(false);
  }
  const completeGame = () => {
    setGameWon(true);
  }
  const incrementMoveCount = () => {
    setmoveCount(prevCount => prevCount + 1)
  }
  const countZero = () => {
    setmoveCount(0);
  }

  function toggle(id, num) {
    // calling the selection function that pushes the tile number inside the array
    setInitTiles((prevTile) => {
      return prevTile.map((item) => {
        return item.id === id ? { ...item, selected: !item.selected } : item;
      })
    })
    selection(id, num);
  }

  const selection = (id, num) => {
    if (selected.length == 0) {
      setSelected((prevSelection) => [...prevSelection, { number: num, id: id }]); // Pushes num of the selected object inside array
    }
    else if (selected[0].number == num && selected[0].id != id) {
      incrementMoveCount();
      setSelected((prevSelection) => []);
      win(id, selected[0].id)
      clean();
    }
    else {
      if (Selection[0].id != id) {
        incrementMoveCount();
      }
      setSelected((prevSelection) => []);
      setTimeout(() => {
        clean();
      }, 400);
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
    resetGame();
    countZero();
  }
  const value = {
    gameWon,
    resetGame,
    completeGame,
    moveCount,
    incrementMoveCount,
    countZero,
    toggle,
    initTiles,
    selection,
    reset
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