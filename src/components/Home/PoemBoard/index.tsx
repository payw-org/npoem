import { useEffect, useState } from 'react'

import RingProgress from './RingProgress'
import Timer from './Timer'

type PoemBoardProps = {}

const PoemBoard: React.FC<PoemBoardProps> = () => {
  const [isStopped, setIsStopped] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsStopped(true)
    }, 1000)
  }, [])

  return (
    <div className="poem-board" data-component="">
      <RingProgress />
      <Timer isStopped={isStopped} />
    </div>
  )
}

export default PoemBoard
