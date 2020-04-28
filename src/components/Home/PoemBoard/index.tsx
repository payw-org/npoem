import RingProgress from './RingProgress'

type PoemBoardProps = {}

const PoemBoard: React.FC<PoemBoardProps> = () => {
  return (
    <div className="poem-board" data-component="">
      <RingProgress />
    </div>
  )
}

export default PoemBoard
