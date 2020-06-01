import './style.scss'

import RingProgress from './RingProgress'
import Timer from './Timer'
import UserInputs from './UserInputs'
import { useState } from 'react'

type PoemBoardProps = unknown

const PoemBoard: React.FC<PoemBoardProps> = () => {
  // Today's word
  const word = '가산디지털단지'

  const [isStopped, setIsStopped] = useState(false)

  const [appState, setAppState] = useState(0)

  return (
    <div className="poem-board" data-component="">
      <section className="section--poem">
        <div className="user-inputs-wrapper">
          <UserInputs word={word} isReady={appState === 1} />
        </div>
      </section>

      <section className="section--timer">
        {appState === 0 && (
          <RingProgress
            totalSeconds={1}
            onAnimationEnd={() => {
              setTimeout(() => {
                setAppState(1)
              }, 500)
            }}
          />
        )}
        {appState >= 1 && (
          <Timer
            isStopped={isStopped}
            onEnd={(elapsedTime) => {
              alert(elapsedTime)
            }}
          />
        )}
      </section>
    </div>
  )
}

export default PoemBoard
