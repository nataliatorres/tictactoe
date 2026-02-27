import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameSquare from './components/GameSquare'
import confetti from 'canvas-confetti'
import { TURNS } from './utils/constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const turnSquareStyle = "grid w-17.5 h-17.5 border-2 rounded-[5px] border-solid border-transparent place-items-center pointer-events-none text-5xl"

  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='w-fit my-10 mx-auto text-center'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame} className='w-25 py-2 px-3 m-6 bg-transparent text-gray-200 border-2 border-solid border-gray-200 rounded-lg transition-200 font-bold cursor-pointer hover:bg-[#eee] hover:text-[#222]'>Reset game</button>

      <section className='grid grid-cols-3 gap-2.5'>
        {
          // board.map((_, index) => {
          board.map((square, index) => {
            return (
              <GameSquare
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {square}
              </GameSquare>
            )
          })
        }
      </section>

      <section className="flex justify-center w-fit my-3.75 mx-auto relative rounded-[10px]">
        <GameSquare squareStyle={turnSquareStyle} isSelected={turn === TURNS.X}>{TURNS.X}</GameSquare>
        <GameSquare squareStyle={turnSquareStyle} isSelected={turn === TURNS.O}>{TURNS.O}</GameSquare>
      </section>
      
      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}

export default App
