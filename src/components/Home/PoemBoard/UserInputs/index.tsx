import './style.scss'

import { useEffect, useState } from 'react'

import Field from './Field'

function getInputElmOfIndex(index: number): HTMLInputElement {
  const fields = document.querySelectorAll('.field[data-component]')

  return fields[index].querySelector('.input') as HTMLInputElement
}

type UserInputsProps = {}

const UserInputs: React.FC<UserInputsProps> = () => {
  const word = '아스파라거스'.split('')
  const [inputs, setInputs] = useState(Array<string>(word.length))

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const firstInputElm = getInputElmOfIndex(0)
    firstInputElm.focus()
  }, [])

  return (
    <div className="user-inputs" data-component="">
      {word.map((letter, i) => (
        <Field
          key={i}
          letter={letter}
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
