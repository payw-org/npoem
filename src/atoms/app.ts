import { atom } from 'recoil'

export enum GameStep {
  READY,
  PLAYING,
  DONE,
}

export const gameStepState = atom({
  key: 'gameStepState',
  default: GameStep.READY,
})

export const poemInputsState = atom<string[]>({
  key: 'poemInputsState',
  default: [],
})

export const todayWordState = atom<number>({
  key: 'todayWordState',
  default: 0,
})

export const accessTokenState = atom<string>({
  key: 'accessTokenState',
  default: '',
})

export const isPlayedTodayState = atom<boolean>({
  key: 'isPlayedTodayState',
  default: false,
})
