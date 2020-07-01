import { accessTokenState } from '@/atoms/app'
import fetchTodayToken from '@/data/mutation/fetch-today-token'
import { useSetRecoilState } from 'recoil'

const isToken = (): boolean | undefined => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('accessToken')) {
      return true
    } else {
      return false
    }
  }
}

const getToken = (): string | null | undefined => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken')
      return accessToken
    }
  }
}

const setToken = async (nickname: string): Promise<void> => {
  const setAccessToken = useSetRecoilState(accessTokenState)
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken')
      accessToken && setAccessToken(accessToken)
    } else {
      const accessToken = await fetchTodayToken(nickname)
      localStorage.setItem('accessToken', accessToken)
      setAccessToken(accessToken)
    }
  }
  // console.log('setToken', accessToken)
}

export { isToken, getToken, setToken }
