import './style.scss'

import {
  GameStep,
  gameStepState,
  poemInputsGap,
  ringProgressRadius,
} from '@/atoms/app'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import RingProgress from './RingProgress'
import Timer from './Timer'
import UserInputs from './UserInputs'

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

  const setGap = useSetRecoilState(poemInputsGap)
  const [radius, setRadius] = useRecoilState(ringProgressRadius)

  useEffect(() => {
    function setProperGap() {
      if (window.innerWidth < 900) {
        setGap(55)
        setRadius(100)
      } else {
        setGap(80)
        setRadius(150)
      }
    }

    setProperGap()

    const windowResizeHandler = () => {
      setProperGap()
    }

    window.addEventListener('resize', windowResizeHandler)

    return () => {
      window.removeEventListener('resize', windowResizeHandler)
    }
  }, [])

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
            totalSeconds={5}
            onAnimationEnd={() => {
              setTimeout(() => {
                setGameStep(GameStep.PLAYING)
              }, 500)
            }}
            radius={radius}
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
