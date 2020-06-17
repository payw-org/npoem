import './style.scss'

import { GameStep, gameStepState } from '@/atoms/app'
import { useEffect, useRef, useState } from 'react'

import RingProgress from './RingProgress'
import Timer from './Timer'
import UserInputs from './UserInputs'
import { useRecoilState } from 'recoil'

type PoemBoardProps = {
  word: string
}

const PoemBoard: React.FC<PoemBoardProps> = ({ word }) => {
  const [isStopped, setIsStopped] = useState(false)

  const [gameStep, setGameStep] = useRecoilState(gameStepState)

  useEffect(() => {
    console.log(`gameStep: ${gameStep} changes`)

    if (gameStep === GameStep.DONE) {
      setIsStopped(true)

      authorInput.current && authorInput.current.focus()
    }
  }, [gameStep])

  const authorInput = useRef<HTMLInputElement>(null)

  return (
    <div className="poem-board" data-component="">
      <section className="section--poem">
        <div className="user-inputs-wrapper">
          <UserInputs word={word} />
        </div>
      </section>

      <section className="section--timer">
        {gameStep === GameStep.READY && (
          <RingProgress
            totalSeconds={1}
            onAnimationEnd={() => {
              setTimeout(() => {
                setGameStep(GameStep.PLAYING)
              }, 500)
            }}
          />
        )}
        {gameStep >= GameStep.PLAYING && <Timer isStopped={isStopped} />}
      </section>

      {gameStep === GameStep.DONE && (
        <section className="section--submit">
          <div className="input-container">
            <input
              ref={authorInput}
              type="text"
              className="name"
              placeholder="작가명"
            />
            <button
              className="btn"
              onClick={() => {
                alert('제출 완료')
              }}
            >
              완료
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default PoemBoard
