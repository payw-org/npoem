import './style.scss'

import { useEffect, useRef, useState } from 'react'

type RingProgressProps = {
  /** @default 3 */
  stroke?: number
  /** @default 125 */
  radius?: number
  /** @default 5 */
  totalSeconds?: number
  /**
   * Delay before begin in milliseconds
   * @default 0
   */
  delay?: number
  /**
   * Fire on every second
   *
   * @param remainingSecond Currently remaining seconds
   * @param totalSeconds
   */
  onEverySecond?: (remainingSecond: number, totalSeconds: number) => void
  /**
   * Fire when the remaining seconds is 0
   */
  onEnd?: () => void
  /**
   * Fire after the animation completely ends
   */
  onAnimationEnd?: () => void
}

const RingProgress: React.FC<RingProgressProps> = (props) => {
  const {
    stroke = 5,
    radius = 150,
    totalSeconds = 5,
    delay = 0,
    onEverySecond: everySecondHook,
    onEnd: endHook,
    onAnimationEnd: animationEndHook,
  } = props
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const [strokeDashoffset, setStrokeDashoffset] = useState(
    circumference - (100 / 100) * circumference
  )
  const [remainingSeconds, setRemainingSecond] = useState(totalSeconds)

  function setProgress(percentage: number): void {
    const offset = circumference - (percentage / 100) * circumference

    setStrokeDashoffset(offset)
  }

  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    setTimeout(() => {
      // Initially run `everySecondHook`
      everySecondHook && everySecondHook(totalSeconds, totalSeconds)

      const intv = setInterval(() => {
        setRemainingSecond((second) => {
          const next = second - 1

          // Fire `everySecondHook` on every second
          everySecondHook && everySecondHook(next, totalSeconds)

          // If the timer ends, clear the timeout and fire `endHook`
          if (next === 0) {
            clearInterval(intv)

            endHook && endHook()

            setTimeout(() => {
              animationEndHook && animationEndHook()
            }, parseInt(getComputedStyle(circleRef.current as SVGElement).getPropertyValue('--animation-duration')))
          }

          return next
        })
      }, 1000)
    }, delay)
  }, [])

  // When `remainingSeconds` changes
  // calculate percent and set progress
  useEffect(() => {
    const percentage = (remainingSeconds / totalSeconds) * 100

    setProgress(percentage)
  }, [remainingSeconds])

  return (
    <div className="beginning-progress" data-component="">
      <svg height={radius * 2} width={radius * 2} className="progress-ring">
        <circle
          ref={circleRef}
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
        {remainingSeconds > 0
          ? remainingSeconds + '초 후에 시작합니다.'
          : '준비하세요!'}
      </p>
    </div>
  )
}

export default RingProgress
