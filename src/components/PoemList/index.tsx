import './style.scss'

import ApolloClient, { gql } from 'apollo-boost'
import { useEffect, useState } from 'react'
import PoemItem from '@/components/PoemList/PoemItem'
import apiUrl from '@/modules/api-url'

type PoemListProps = unknown

type PoemType = {
  id: number
  username: string
  time: number
  word: string
  poem: string[]
}

const uri = apiUrl.graphql

const fetchPoemList = async (): Promise<PoemType[]> => {
  const client = new ApolloClient({ uri })

  type OriginPoemType = {
    id: number
    content: string
    timeSpent: number
    word: {
      text: string
    }
    user: {
      nickname: string
    }
  }

  const {
    data: { poems },
  } = await client.query({
    query: gql`
      {
        poems {
          id
          timeSpent
          content
          word {
            text
          }
          user {
            nickname
          }
        }
      }
    `,
  })

  const poemList: PoemType[] = poems.map((poem: OriginPoemType) => ({
    id: poem.id,
    username: poem.user.nickname,
    time: ~~poem.timeSpent,
    word: poem.word.text,
    poem: poem.content.split('@'),
  }))

  return poemList
}

const PoemList: React.FC<PoemListProps> = () => {
  const [poemList, setPoemList] = useState<PoemType[]>([])

  useEffect(() => {
    const init = async () => {
      setPoemList(await fetchPoemList())
    }
    init()
  }, [])

  return (
    <div className="poem-list" data-component="">
      <div className="poem-container">
        <div className="title">실시간 엔행시</div>
        {poemList.map((poem: PoemType) => (
          <PoemItem key={poem.id} {...poem} />
        ))}
      </div>
    </div>
  )
}

export default PoemList
