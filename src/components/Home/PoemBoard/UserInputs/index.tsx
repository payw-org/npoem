import './style.scss'

import { GameStep, gameStepState, poemInputsState } from '@/atoms/app'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import Field from './Field'

function getInputElmOfIndex(index: number): HTMLInputElement {
  const fields = document.querySelectorAll('.field[data-component]')

  return fields[index].querySelector('.input') as HTMLInputElement
}

type UserInputsProps = {
  word: string
}

const UserInputs: React.FC<UserInputsProps> = ({ word }) => {
  const gameStep = useRecoilValue(gameStepState)
  const splittedWord = word.split('')
  const [poemInputs, setPoemInputs] = useRecoilState(poemInputsState)

  useEffect(() => {
    setPoemInputs(Array<string>(word.length))
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)

  const [additionalMargins, setAdditionalMargins] = useState<number[]>([
    ...new Array(splittedWord.length).fill(0),
  ])

  useEffect(() => {
    const firstInputElm = getInputElmOfIndex(0)
    firstInputElm.focus()
  }, [])

  useEffect(() => {
    if (gameStep === GameStep.PLAYING) {
      ;(document.querySelector('.field .input') as HTMLInputElement).focus()
    }
  }, [gameStep])

  return (
    <div
      className="user-inputs"
      data-component=""
      style={{
        transform: `translateY(-${
          additionalMargins[additionalMargins.length - 1]
        }px)`,
      }}
    >
      {splittedWord.map((letter, i) => (
        <Field
          isReady={gameStep >= GameStep.PLAYING}
          key={i}
          letter={letter}
          additionalMargin={additionalMargins[i]}
          setAdditionalMargins={setAdditionalMargins}
          setInput={(value): void => {
            const newInputs = [...poemInputs]
            newInputs[i] = value

            setPoemInputs(newInputs)
          }}
          totalLength={splittedWord.length}
          index={i}
          currentIndex={currentIndex}
          next={(): void => {
            setCurrentIndex((currentIndex) => {
              const nextCurrentIndex = currentIndex + 1
              const nextInputElm = getInputElmOfIndex(nextCurrentIndex)
              setTimeout(() => {
                nextInputElm.focus()
              }, 0)

              return nextCurrentIndex
            })
          }}
        />
      ))}
    </div>
  )
}

export default UserInputs
