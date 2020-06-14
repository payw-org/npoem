import './style.scss'

import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

type FieldProps = {
  letter: string
  setInput: (value: string) => void
  index: number
  currentIndex: number
  next: () => void
  isReady: boolean
  additionalMargin: number
  setAdditionalMargins: Dispatch<SetStateAction<number[]>>
}

const Field: React.FC<FieldProps> = ({
  letter,
  setInput,
  index,
  currentIndex,
  next,
  isReady,
  additionalMargin = 0,
  setAdditionalMargins,
}) => {
  const [value, setValue] = useState('')
  const distance = index - currentIndex
  const absDistance = Math.abs(distance)
  const blurAmount = absDistance * 0.6

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const inputShadowRef = useRef<HTMLTextAreaElement>(null)

  const style: CSSProperties = isReady
    ? {
        transform: `translateX(${distance ** 2 * -2}px) translateY(${
          distance * 80 + additionalMargin + 'px'
        }) scale(${(100 - absDistance * 4) / 100})`,
        filter: `blur(${blurAmount}px)`,
        opacity: (100 - absDistance * 4) / 100,
      }
    : {
        transform: `translateX(${distance * 2}rem)`,
      }

  const fontColorPicker = (index: number) => {
    switch (index % 7) {
      case 0:
        return 'var(--emerald)'

      case 1:
        return 'var(--blue)'

      case 2:
        return 'var(--violet)'

      case 3:
        return 'var(--pink)'

      case 4:
        return 'var(--rose)'

      case 5:
        return 'var(--orange)'

      default:
        break
    }
  }

  const fontStyle: CSSProperties =
    currentIndex > index
      ? { color: fontColorPicker(index) }
      : currentIndex == index && isReady
      ? {
          color: 'var(--alt-white)',
          background: fontColorPicker(index),
          borderRadius: '10px',
          padding: '9px 14px 9px 14px',
        }
      : { color: 'var(--gray)' }

  const textareaStyle: CSSProperties =
    currentIndex == index && isReady ? { marginTop: '9px' } : {}

  const lastLineCount = useRef(1)

  function updateLineCount(value: string) {
    const input = inputRef.current
    const inputShadow = inputShadowRef.current

    if (input && inputShadow) {
      inputShadow.value = value
      input.style.height = inputShadow.scrollHeight + 'px'

      const lineCount = Math.floor(inputShadow.scrollHeight / 42)

      setAdditionalMargins((previous) => {
        const next = [...previous]
        const lineCountDiff = lineCount - lastLineCount.current
        for (let i = index + 1; i < previous.length; i += 1) {
          next[i] += lineCountDiff * 42
        }
        lastLineCount.current = lineCount
        return next
      })
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (inputRef.current?.value) {
        updateLineCount(inputRef.current?.value)
      }
    })

    if (inputRef.current) {
      resizeObserver.observe(inputRef.current)
    }
  }, [])

  return (
    <div className="field" data-component="" style={style}>
      <div style={fontStyle} className="letter">
        {letter}
      </div>
      <div className="input-container">
        <textarea className="input-shadow" ref={inputShadowRef} tabIndex={-1} />
        <textarea
          style={textareaStyle}
          spellCheck="false"
          ref={inputRef}
          disabled={currentIndex !== index || !isReady}
          className="input"
          value={value}
          onChange={(e): void => {
            const value = e.target.value
            setValue(value)
            setInput(value)
            updateLineCount(value)
          }}
          onKeyDown={(e): void => {
            if (e.key === 'Enter') {
              e.preventDefault()
              next()
            }
          }}
          onKeyUp={(e): void => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        />
      </div>
    </div>
  )
}

export default Field
