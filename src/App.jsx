import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameSquare from './components/GameSquare'

const TURNS = {
  X: '❌',
  O: '⚪'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const turnSquareStyle = "grid w-17.5 h-17.5 border-2 rounded-[5px] border-solid border-transparent place-items-center pointer-events-none text-5xl"

  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck [c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
}

  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  return (
    <main className='w-fit my-10 mx-auto text-center'>
      <h1 className='mb-4'>Placeholder</h1>
      <section className='grid grid-cols-3 gap-2.5'>
        {
          board.map((_, index) => {
            return (
              <GameSquare
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {board[index]}
              </GameSquare>
            )
          })
        }
      </section>

      <section className="flex justify-center w-fit my-3.75 mx-auto relative rounded-[10px]">
        <GameSquare squareStyle={turnSquareStyle} isSelected={turn === TURNS.X}>{TURNS.X}</GameSquare>
        <GameSquare squareStyle={turnSquareStyle} isSelected={turn === TURNS.O}>{TURNS.O}</GameSquare>
      </section>
    </main>
  )
}

export default App
