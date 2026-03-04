import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import GameSquare from './components/GameSquare'
import confetti from 'canvas-confetti'
import { TURNS } from './utils/constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic'

function App () {
  const turnSquareStyle = 'grid w-17.5 h-17.5 border-2 rounded-[5px] border-solid border-transparent place-items-center pointer-events-none text-5xl'

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

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
    resetGameStorage()
  }

  return (
    <>
      <NavBar />
      <main className='w-86 flex justify-center my-10 mx-auto text-center'>
        <section>
          <h1 className='my-5 text-[#4f5030]'>Tic Tac Toe</h1>
          <section className='w-[320px] grid grid-cols-3 gap-2.5'>
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

          <section className='flex justify-center w-fit my-3.75 mx-auto relative rounded-[10px]'>
            <GameSquare squareStyle={turnSquareStyle} isSelected={turn === TURNS.X}>{TURNS.X}</GameSquare>
            <GameSquare squareStyle={turnSquareStyle} isSelected={turn === TURNS.O}>{TURNS.O}</GameSquare>
          </section>
          <button onClick={resetGame} className='w-40 py-2 px-3 m-3 bg-[#4f5030] font-bold text-xl text-[#dfd3bd] border-2 border-solid border-[#4f5030] rounded-lg transition-200 cursor-pointer hover:bg-[#dfd3bd] hover:text-[#4f5030]'>Reset game</button>

          <WinnerModal winner={winner} resetGame={resetGame} />
        </section>
      </main>
    </>
  )
}

export default App
