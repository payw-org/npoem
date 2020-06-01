import './style.scss'

import { useEffect, useState } from 'react'

import Field from './Field'

function getInputElmOfIndex(index: number): HTMLInputElement {
  const fields = document.querySelectorAll('.field[data-component]')

  return fields[index].querySelector('.input') as HTMLInputElement
}

type UserInputsProps = {
  word: string
  isReady: boolean
}

const UserInputs: React.FC<UserInputsProps> = ({ word, isReady }) => {
  const splittedWord = word.split('')
  const [inputs, setInputs] = useState(Array<string>(word.length))

  const [currentIndex, setCurrentIndex] = useState(0)

  const [additionalMargins, setAdditionalMargins] = useState<number[]>([
    ...new Array(splittedWord.length).fill(0),
  ])

  useEffect(() => {
    const firstInputElm = getInputElmOfIndex(0)
    firstInputElm.focus()
  }, [])

  useEffect(() => {
    if (isReady) {
      ;(document.querySelector('.field .input') as HTMLInputElement).focus()
    }
  }, [isReady])

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
          isReady={isReady}
          key={i}
          letter={letter}
          additionalMargin={additionalMargins[i]}
          setAdditionalMargins={setAdditionalMargins}
          setInput={(value): void => {
            const newInputs = [...inputs]
            newInputs[i] = value

            setInputs(newInputs)
          }}
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
