import './style.scss'

import { GameStep, gameStepState } from '@/atoms/app'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import ApolloClient from 'apollo-boost'
import RingProgress from './RingProgress'
import Timer from './Timer'
import UserInputs from './UserInputs'
import { gql } from 'apollo-boost'

type PoemBoardProps = {
  word: string
}

const uri = `https://api.npoem.xyz/graphql`

const PoemBoard: React.FC<PoemBoardProps> = ({ word }) => {
  const [isStopped, setIsStopped] = useState(false)

  const [gameStep, setGameStep] = useRecoilState(gameStepState)

  useEffect(() => {
    console.log(`gameStep: ${gameStep} changes`)

    if (gameStep === GameStep.DONE) {
      setIsStopped(true)
    }
  }, [gameStep])

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
          <input type="text" className="name" placeholder="작가명" />
          <button className="btn">완료</button>
        </section>
      )}
    </div>
  )
}

export default PoemBoard
