import ApolloClient, { gql } from 'apollo-boost'

import apiUrl from '@/modules/api-url'

const uri = apiUrl.graphql
const fetchCheckOverlapUser = async (userName: string): Promise<boolean> => {
  const client = new ApolloClient({ uri })
  const {
    data: { user },
  } = await client.query({
    query: gql`
      {
        user(nickname: "${userName}") {
          id
        }
      }
    `,
  })
  console.log(user)
  return user
}

export default fetchCheckOverlapUser
