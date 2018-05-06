import ActionTypes from './ActionTypes'

export function login(userId) {
  return {
    type: ActionTypes.USER_LOGIN,
    userId: userId
  }
}