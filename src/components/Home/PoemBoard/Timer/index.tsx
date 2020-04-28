import './style.scss'

import { useEffect, useRef, useState } from 'react'

type TimerProps = {
  isStopped?: boolean
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
  }, [])

  useEffect(() => {
    if (isStopped === true) {
      clearInterval(intv.current)
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
        <span className="time">{(elapsedTime / 1000).toFixed(2)}</span>s
      </span>
    </div>
  )
}

export default Timer
