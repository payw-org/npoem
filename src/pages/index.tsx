import { NextPage } from 'next'
import { accessTokenState } from '@/atoms/app'
import fetchdDidPlayedToken from '@/data/query/fetch-did-played-token'
import { isToken } from '@/modules/tokenHandler'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/dist/client/router'

const Index: NextPage = () => {
  //access 토큰 확인
  const isAccessToken = isToken()

  //오늘 했는지 확인
  const accessToken = useRecoilValue(accessTokenState)
  const isPlayed =
    accessToken !== '' ? fetchdDidPlayedToken(accessToken) : false

  const router = useRouter()

  useEffect(() => {
    if (isAccessToken) {
      if (isPlayed) {
        router.replace('/list')
      } else {
        router.replace('/poem')
      }
    } else {
      router.replace('/poem')
    }
  }, [])

  return <></>
}

export default Index
