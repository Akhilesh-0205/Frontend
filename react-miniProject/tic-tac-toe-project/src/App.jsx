import { useState } from "react"

function Square({value, onSquareClick}){
  return(
    <>
    <button onClick = {onSquareClick}>{value}</button>
    </>
  )
}

function isWinner(squares){
  const winnerArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for(let i = 0; i < winnerArray.length; i++){
    const [a, b, c] = winnerArray[i]
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]){
      return squares[a]
    }
  }
  return null
}

export default function Board(){
  const [squares, setSquare] = useState(Array(9).fill(null))
  const [isNext, setIsNext] = useState(true)
  
    const winner = isWinner(squares)
    let status;
    if (winner){
      status = "Winner is :" + winner
    }
    else{
      status = "Next turn :" + (isNext? "X" : "O")
    } 

  function handleClick(i){
    if (squares[i] || isWinner(squares)){
      return;
    }
    const temp = squares.slice()
    if (isNext){
      temp[i] = "X"
    }
    else{
      temp[i] = "O"
    }
    setSquare(temp)
    setIsNext(!isNext)
  }
  return(
    <>
    <div>{status}</div>
    <div className = "row">
      <Square value = {squares[0]} onSquareClick = {()=> {handleClick(0)}}/>
      <Square value = {squares[1]} onSquareClick = {()=> {handleClick(1)}}/>
      <Square value = {squares[2]} onSquareClick = {()=> {handleClick(2)}}/>
    </div>
    <div className = "row">
      <Square value = {squares[3]} onSquareClick = {()=> {handleClick(3)}}/>
      <Square value = {squares[4]} onSquareClick = {()=> {handleClick(4)}}/>
      <Square value = {squares[5]} onSquareClick = {()=> {handleClick(5)}}/>
    </div>
    <div className = "row">
      <Square value = {squares[6]} onSquareClick = {()=> {handleClick(6)}}/>
      <Square value = {squares[7]} onSquareClick = {()=> {handleClick(7)}}/>
      <Square value = {squares[8]} onSquareClick = {()=> {handleClick(8)}}/>
    </div>
    </>
  )
}