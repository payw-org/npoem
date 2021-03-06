import ApolloClient, { gql } from 'apollo-boost'
import { GetServerSideProps, NextPage } from 'next'
import Home, { HomeProps } from '@/components/Home'

const fetchTodayWord = async () => {
  const client = new ApolloClient({
    uri: `https://api.npoem.xyz/graphql`,
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const word = await fetchTodayWord()

  return {
    props: {
      word: word.text,
    },
  }
}

const Page: NextPage<HomeProps> = ({ word }) => {
  return <Home word={word} />
}

export default Page
