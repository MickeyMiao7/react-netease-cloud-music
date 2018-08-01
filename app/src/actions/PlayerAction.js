import ActionTypes from './ActionTypes'

export function play() {
  return {
    type:ActionTypes.PLAYER_PLAY,
  }
}

export function pause() {
  return { 
    type: ActionTypes.PLAYER_PAUSE,
  }
}