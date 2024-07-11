import React, { useEffect } from 'react';
import './styling/App.css';
import './styling/Tiles.css';
import Tile from './tile.jsx';
import WinScreen from './WinScreen.jsx';
import initialTiles from './squareDB.js';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

function App() {

  // STATE CONTAINING THE INITIAL TILES
  const [InitTile,setTiles]= React.useState(initialTiles);
  const [Selection, setSelection]= React.useState([]);
  const [Count,SetCount]=React.useState(0);
  const [Won,SetWon]=React.useState(false)
  
  React.useEffect(() => {
    function checkGameWon(item){
      return item.won == false
    }
    const leftTobeWon = InitTile.filter(checkGameWon);
    console.log(leftTobeWon)
    if (leftTobeWon.length==0){
      SetWon(true);
      console.log("set")
    }
}, [InitTile]);

  // functions that toggles the selected prop
  function toggle(id,num){
     // calling the selection function that pushes the tile number inside the array
    setTiles((prevTile)=>{
      return prevTile.map((item)=>{
        return item.id===id ? {...item, selected : !item.selected}: item; 
      })
    })
    selection(id,num); 
  } 

  // This function puts the selectedn  tile inside the array and checks for a match as well
  function selection(id,num)
  {
    if(Selection.length==0){
      setSelection((prevSelection) => [...prevSelection, {number :num , id : id}]); // Pushes num of the selected object inside array
    }
    else if(Selection[0].number==num && Selection[0].id != id){
      SetCount((item)=> {return ++item}) 
      setSelection((prevSelection)=>[]);
      win(id,Selection[0].id);
      clean();
    }
    else {
      if(Selection[0].id != id){
        SetCount((item)=> {return ++item}) ;
      }
      setSelection((prevSelection)=>[]);
      setTimeout(() => {
        clean();
      }, 400); 
    }
  }

  function win(id1,id2){
    setTiles((prevTile)=>{
      return prevTile.map((item)=>{
        return (item.id==id1 || item.id==id2) ? {...item, won:!item.won}: item; 
      })
    })
  }
  function clean(){
    setTiles((prevTile)=>{
      return prevTile.map((item)=>{
        return item.selected==true ? {...item, selected : !item.selected}: item; 
      })
    })
  }
  // Reset the game 
  function reset(){
    setTiles((prevTile)=>{
      return prevTile.map((tile)=>{
        return {...tile, won: false}
      })
    })  
    SetWon(!Won);
    SetCount(0);
  }

  //Confetti
  const { width, height } = useWindowSize()
  // Tiles constat is responsible for rendering all the 60 tiles by mapping the raw state 
  const tiles = InitTile.map((item)=>{return (
    <Tile 
      id ={item.id}
      selected={item.selected}
      won = {item.won}
      num = {item.num}
      handleClick={()=>toggle(item.id,item.num)}
      src={item.img}
    />
  )});

  return (
    <div className='MainPage'>
    {
      (Won) ? (
        <>
          <Confetti width={width} height={height} numberOfPieces={500} />
          <WinScreen count={Count} handleClick={reset}/>
        </>
      ) :
      (
        <>
          <h1 className='score'>Moves taken: {Count}</h1>
          <div className='tiles'>{tiles}</div>
        </>
      )
    }
    </div>
  )
}

export default App;
