import ApolloClient, { gql } from 'apollo-boost'

import apiUrl from '@/modules/api-url'

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
        }
      }
    `,
  })

  const poemList: PoemType[] = poems.map((poem: OriginPoemType) => ({
    id: poem.id,
    username: '김정빈지노',
    time: ~~poem.timeSpent,
    word: poem.word.text,
    poem: poem.content.split('@'),
  }))

  return poemList
}

export default fetchPoemList
