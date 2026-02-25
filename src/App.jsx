import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const board = Array(9).fill(null)

function App() {

  return (
    <main className='w-fit my-10 mx-auto text-center'>
      <h1 className='mb-4'>Tic Tac Toe</h1>
      <section className='grid grid-cols-3 gap-2.5'>
        {
          board.map((_, index) => {
            return (
              <div key={index}>
                <span>
                  {index}
                </span>
              </div>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
