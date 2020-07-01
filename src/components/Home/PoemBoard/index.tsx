import './style.scss'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import {
  GameStep,
  accessTokenState,
  gameStepState,
  poemInputsState,
} from '@/atoms/app'
// import { getToken, setToken } from '@/modules/tokenHandler'
import { useRecoilState, useRecoilValue } from 'recoil'

import Link from 'next/link'
import RingProgress from './RingProgress'
import Timer from './Timer'
import UserInputs from './UserInputs'
import contentCreate from '@/modules/contentCreate'
import fetchCheckOverlapUser from '@/data/query/fetch-check-overlap-user'
import fetchTodayToken from '@/data/mutation/fetch-today-token'

// import fetchWritePoem from '@/data/mutation/fetch-write-poem'
// import fetchdDidPlayedToken from '@/data/query/fetch-did-played-token'

type PoemBoardProps = {
  word: string
  id: number
  token: boolean
}
const createUserToken = async (
  userNick: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) => {
  console.log('여기까지3')
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  console.log('여기까지5')
  const a = await fetchTodayToken(userNick)
  console.log(a)
  setAccessToken(a)
  // console.log(a)
  console.log('여기까지2')
}

const checkOverlapUser = async (
  userNick: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) => {
  console.log('여기까지')
  await fetchCheckOverlapUser(userNick)
  await createUserToken(userNick, setAccessToken)
  console.log('여기까지2')
}

// const writePoem = (
//   content: string,
//   timeSpent: number,
//   wordId: string,
//   token: string
// ) => {
//   fetchWritePoem(content, timeSpent, wordId, token)
// }

const PoemBoard: React.FC<PoemBoardProps> = ({ word, id }) => {
  const [isStopped, setIsStopped] = useState(false)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [gameStep, setGameStep] = useRecoilState(gameStepState)
  // setAccessToken('ffsdfdsf')
  // const played = accessToken !== '' ? fetchdDidPlayedToken(accessToken) : false
  // fetchCheckOverlapUser('닉네임')
  // fetchCheckOverlapUser('testfdsfcxwjuhisbjsdyugbki')
  // if (token) {
  //   setAccessToken(getToken())
  // }
  useEffect(() => {
    console.log(`gameStep: ${gameStep} changes`)

    if (gameStep === GameStep.DONE) {
      setIsStopped(true)

      authorInput.current && authorInput.current.focus()
    }
  }, [gameStep])

  const authorInput = useRef<HTMLInputElement>(null)
  console.log('ㅇㄴㅁㅇㅁㄴㅇㄴㅁㅇㅁㄴ')
  // const userName = authorInput.current.value
  const [userName, setUserName] = useState('')
  const poemStep = useRecoilValue(poemInputsState)

  const content = contentCreate(poemStep)
  // const [wordId, setWordId] = useRecoilState(todayWordState)

  // setWordId(word.id)
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
          <div className="input-container">
            <input
              type="text"
              className="name"
              placeholder="작가명"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
            />
            <Link href="/list">
              <button
                className="btn"
                onClick={async () => {
                  await checkOverlapUser(userName, setAccessToken)
                  // createUserToken(userName)
                  console.log(userName, content, id, accessToken)
                }}
              >
                완료
              </button>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default PoemBoard
