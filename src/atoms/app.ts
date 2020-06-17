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
