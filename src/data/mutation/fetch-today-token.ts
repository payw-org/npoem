import ApolloClient, { gql } from 'apollo-boost'

import apiUrl from '@/modules/api-url'

const uri = apiUrl.graphql
const fetchTodayToken = async (nickname: string): Promise<string> => {
  const client = new ApolloClient({ uri })
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        createUser(userSaveDto: {
          nickname: "${nickname}"
        })
      }
    `,
  })
  const { createUser } = data
  console.log(createUser)
  return createUser
}

export default fetchTodayToken
