const GameSquare = ({children, squareStyle, isSelected, updateBoard, index}) => {

const handleClick = () => {
    updateBoard(index)
}

    return (
        <div onClick={handleClick} className={` ${squareStyle ? squareStyle : 'grid w-25 h-25 border-2 rounded-[5px] border-solid border-white place-items-center cursor-pointer text-5xl'} ${isSelected ? 'color-black bg-[#7baed0]' : ''}`}>
            {children}
        </div>
    )
}

export default GameSquare;