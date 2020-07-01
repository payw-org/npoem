import ApolloClient, { gql } from 'apollo-boost'

import apiUrl from '@/modules/api-url'

const uri = apiUrl.graphql
const fetchWritePoem = async (
  content: string,
  timeSpent: number,
  wordId: string,
  token: string
): Promise<string> => {
  const client = new ApolloClient({ uri })
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        writePoem(
          entitySaveDto: {
            content: "${content}"
            timeSpent: ${timeSpent}
            wordId: "${wordId}"
            token: "${token}"
          }
        )
      }
    `,
  })
  console.log(data)
  return data
}

export default fetchWritePoem
