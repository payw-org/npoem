import './style.scss'

import { useEffect, useState } from 'react'

import RingProgress from './RingProgress'
import UserInputs from './UserInputs'

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
      <section className="section--poem">
        <div className="user-inputs-wrapper">
          <UserInputs />
        </div>
      </section>
      <section className="section--timer">
        <RingProgress />
        {/* <Timer isStopped={isStopped} /> */}
      </section>
    </div>
  )
}

export default PoemBoard
