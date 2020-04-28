import RingProgress from './RingProgress'

type PoemBoardProps = {}

const PoemBoard: React.FC<PoemBoardProps> = () => {
  return (
    <div className="component-poem-board">
      <RingProgress />
    </div>
  )
}

export default PoemBoard
