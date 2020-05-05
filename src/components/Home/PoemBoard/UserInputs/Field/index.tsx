import './style.scss'

import { useRef, useState } from 'react'

type FieldProps = {
  letter: string
  setInput: (value: string) => void
  index: number
  currentIndex: number
  next: () => void
}

const Field: React.FC<FieldProps> = ({
  letter,
  setInput,
  index,
  currentIndex,
  next,
}) => {
  const [value, setValue] = useState('')
  const distance = index - currentIndex
  const absDistance = Math.abs(distance)
  const blurAmount = absDistance * 0.6

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const inputShadowRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div
      className="field"
      data-component=""
      style={{
        transform: `translateY(${distance * 80 + 'px'}) scale(${
          (100 - absDistance * 4) / 100
        })`,
        filter: `blur(${blurAmount}px)`,
        opacity: (100 - absDistance * 4) / 100,
      }}
    >
      <div className="letter">{letter}</div>
      <div className="input-container">
        <textarea className="input-shadow" ref={inputShadowRef} />
        <textarea
          spellCheck="false"
          ref={inputRef}
          disabled={currentIndex !== index}
          className="input"
          value={value}
          onChange={(e): void => {
            const value = e.target.value
            setValue(value)
            setInput(value)

            const input = inputRef.current
            const inputShadow = inputShadowRef.current

            if (input && inputShadow) {
              inputShadow.value = value
              input.style.height = inputShadow.scrollHeight + 'px'
            }
          }}
          onKeyDown={(e): void => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
          onKeyUp={(e): void => {
            if (e.key === 'Enter') {
              e.preventDefault()
              next()
            }
          }}
        />
      </div>
    </div>
  )
}

export default Field
