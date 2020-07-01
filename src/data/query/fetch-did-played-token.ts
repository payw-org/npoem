import ApolloClient, { gql } from 'apollo-boost'

import apiUrl from '@/modules/api-url'

const uri = apiUrl.graphql
const fetchdDidPlayedToken = async (token: string): Promise<boolean> => {
  const client = new ApolloClient({ uri })
  const {
    data: { isPlayedToday },
  } = await client.query({
    context: {
      headers: {
        'X-AUTH-TOKEN': token,
      },
    },
    query: gql`
      {
        isPlayedToday
      }
    `,
  })
  console.log(isPlayedToday)
  return isPlayedToday
}

export default fetchdDidPlayedToken
