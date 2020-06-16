import './style.scss'

import ApolloClient, { gql } from 'apollo-boost'
import { useEffect, useState } from 'react'
import PoemItem from '@/components/PoemList/PoemItem'

type PoemListProps = unknown

type PoemType = {
  id: number
  username: string
  word: string
  poem: string[]
}

const uri = `http://52.78.116.231:8080/graphql`

const fetchPoemList = async (): Promise<PoemType[]> => {
  const client = new ApolloClient({ uri })

  type OriginPoemType = {
    id: number
    content: string
    word: {
      text: string
    }
  }

  const {
    data: { poems },
  } = await client.query({
    query: gql`
      {
        poems {
          id
          content
          word {
            text
          }
        }
      }
    `,
  })

  const poemList: PoemType[] = poems.map((poem: OriginPoemType) => ({
    id: poem.id,
    username: '김정빈지노',
    word: poem.word.text,
    poem: poem.content.split('@'),
  }))

  return poemList
}

const PoemList: React.FC = () => {
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
