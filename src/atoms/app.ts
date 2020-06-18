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

export const poemInputsState = atom({
  key: 'poemInputsState',
  default: [] as string[],
})

export const poemInputsGap = atom({
  key: 'poemInputsGap',
  default: 80,
})

export const ringProgressRadius = atom({
  key: 'ringProgressRadius',
  default: 150,
})
