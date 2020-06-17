import './style.scss'

import { useEffect, useRef, useState } from 'react'

type TimerProps = {
  isStopped?: boolean
  onEnd?: (elapsedTime: number) => void
}

const Timer: React.FC<TimerProps> = (props) => {
  const [elapsedTime, setElapsedTime] = useState(0)
  const { isStopped = false } = props
  const intv = useRef(0)

  useEffect(() => {
    intv.current = window.setInterval(() => {
      setElapsedTime((time) => {
        return time + 10
      })
    }, 10)

    return () => {
      clearInterval(intv.current)
    }
  }, [])

  useEffect(() => {
    if (isStopped === true) {
      clearInterval(intv.current)
      props.onEnd && props.onEnd(elapsedTime)
    }
  }, [isStopped])

  return (
    <div className="timer" data-component="">
      <div className="clock">
        <div
          className="hand"
          style={{
            transform: `translateX(-50%) translateY(calc(-100% + 1px)) rotate(${
              (elapsedTime * 360) / 1000
            }deg)`,
          }}
        />
      </div>
      <span className="time-display">
        <span className="time">{(elapsedTime / 1000).toFixed(1)}s</span>
      </span>
    </div>
  )
}

export default Timer
