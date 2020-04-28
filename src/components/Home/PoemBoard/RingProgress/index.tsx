import './style.scss'

import { useEffect, useState } from 'react'

type BeginningProgressProps = {
  /** @default 3 */
  stroke?: number
  /** @default 125 */
  radius?: number
  /** @default 5 */
  seconds?: number
  /** @default 0 */
  timeout?: number
  everySecondHook?: (remainingSecond: number) => void
  endHook?: () => void
}

const BeginningProgress: React.FC<BeginningProgressProps> = (props) => {
  const { stroke = 3, radius = 125 } = props
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const [percent, setPercent] = useState(100)
  const [strokeDashoffset, setStrokeDashoffset] = useState(
    circumference - (percent / 100) * circumference
  )
  const [remainingSecond, setRemainingSecond] = useState(percent / 20)

  useEffect(() => {
    setRemainingSecond(percent / 20)
  }, [percent])

  function setProgress(percent: number): void {
    setPercent(percent)
    const offset = circumference - (percent / 100) * circumference
    setStrokeDashoffset(offset)
  }

  useEffect(() => {
    const intv = setInterval(() => {
      setPercent((percent) => {
        if (percent - 20 <= 0) {
          clearInterval(intv)
        }
        setProgress(percent - 20)
        return percent - 20
      })
    }, 1000)
  }, [])

  return (
    <div className="component-beginning-progress">
      <svg height={radius * 2} width={radius * 2} className="progress-ring">
        <circle
          stroke="url(#paint0_linear)"
          // stroke="black"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <defs>
          <radialGradient
            id="angular-gradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(124.775 125) rotate(24.5288) scale(116.877 113.594)"
          >
            <stop offset="0.0786731" stopColor="#9A5CFF" />
            <stop offset="0.288934" stopColor="#FF59BD" />
            <stop offset="0.485933" stopColor="#FF4A6B" />
            <stop offset="0.678413" stopColor="#FFAD61" />
            <stop offset="0.684746" stopColor="#1DD0B0" />
            <stop offset="0.87346" stopColor="#6486FF" />
          </radialGradient>
          <linearGradient
            id="paint0_linear"
            x1="53.6663"
            y1="20.2999"
            x2="194.924"
            y2="230.063"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1DD0B0" />
            <stop offset="0.5" stopColor="#9A5CFF" />
            <stop offset="1" stopColor="#FF4A6B" />
          </linearGradient>
        </defs>
      </svg>

      <p className="message">
        {remainingSecond > 0 ? remainingSecond + '초 후에 시작합니다.' : ''}
      </p>
    </div>
  )
}

export default BeginningProgress
