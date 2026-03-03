import GameSquare from "./GameSquare"

export function WinnerModal ({winner, resetGame}) {
    if (winner === null) return null

    const winnerText = winner === false ? 'Tie' : 'Winner'

    return (
        winner !== null && (
        <section className='grid absolute place-items-center w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.7)]'>
            <div className='flex flex-col justify-center items-center gap-5 w-80 h-75 bg-[#dfd3bd] rounded-xl'>
            <h2 className="text-[#4f5030]">{winnerText}</h2>

            <header className='flex gap-3.5 w-fit my-0 mx-auto rounded-xl text-2xl'>
                {
                winner && <GameSquare squareStyle={`w-17.5 h=17.5 pointer-events-none border-transparent`}>{winner}</GameSquare>
                }
            </header>

            <footer>
                <button onClick={resetGame} className='w-35 py-2 px-3 m-6 bg-[#4f5030] font-bold text-lg text-[#dfd3bd] border-2 border-solid border-[#4f5030] rounded-lg transition-200  cursor-pointer hover:bg-[#dfd3bd] hover:text-[#222]'>Play again</button>
            </footer>
            </div>
        </section>
        )
    )
}