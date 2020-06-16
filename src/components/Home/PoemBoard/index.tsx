import './style.scss'

import { useEffect, useState } from 'react'

import ApolloClient from 'apollo-boost'
import RingProgress from './RingProgress'
import Timer from './Timer'
import UserInputs from './UserInputs'
import { gql } from 'apollo-boost'

type PoemBoardProps = unknown

const uri = `https://api.npoem.xyz/graphql`

const fetchTodayWord = async () => {
  const client = new ApolloClient({
    uri,
  })
  const {
    data: {
      todayWord: { word },
    },
  } = await client.query({
    query: gql`
      {
        todayWord {
          id
          word {
            id
            text
          }
        }
      }
    `,
  })

  return word
}

const PoemBoard: React.FC<PoemBoardProps> = () => {
  // Today's word
  const [word, setWord] = useState(' ')
  // const word = '가디단'

  const [isStopped, setIsStopped] = useState(false)

  const [appState, setAppState] = useState(0)

  useEffect(() => {
    fetchTodayWord().then(function (word) {
      setWord(word.text)
    })
  }, [])

  return (
    <div className="poem-board" data-component="">
      <section className="section--poem">
        <div className="user-inputs-wrapper">
          <UserInputs word={word} isReady={appState === 1} />
        </div>
      </section>

      <section className="section--timer">
        {appState === 0 && (
          <RingProgress
            totalSeconds={1}
            onAnimationEnd={() => {
              setTimeout(() => {
                setAppState(1)
              }, 500)
            }}
          />
        )}
        {appState >= 1 && (
          <Timer
            isStopped={isStopped}
            onEnd={(elapsedTime) => {
              alert(elapsedTime)
            }}
          />
        )}
      </section>
    </div>
  )
}

export default PoemBoard
