import { combineReducers } from 'redux'
import ActionTypes from '../actions/ActionTypes'

const defaultStates = {
  playlist: {
    creator: {
      nickname: 'Mickey',
      avatarUrl: ''
    },
    createTime: '',
    playCount: 0,
    trackCount: 0,
    coverImgUrl: '',
    tracks: []
  },
  selectedTrack: {}
}

function login(state=0, action) {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return action.userId
    default:
      return state;
  }

}

function userPlayList(state=[], action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_USER_PLAYLIST_SUCCESS:
      return action.data
    default:
      return state;
  }
}

function selectedPlaylist(state=defaultStates.playlist, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_PLAYLIST_DETAIL_SUCCESS:
      return action.data
    default:
      return state;
  }

}

function selectedTrack(state=defaultStates.selectedTrack, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRACK_SUCCESS:
      return action.data
    default:
      return state
  }
}

function error(state='', action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_AJAX_CALL_FAILURE:
      return action.data
    case ActionTypes.RECEIVE_USER_PLAYLIST_FAILURE:
      return action.data
    default:
      return state
  }
}

const reducer = combineReducers({
  userId: login,
  userPlaylist: userPlayList,
  selectedPlaylist: selectedPlaylist,
  selectedTrack: selectedTrack,
  error: error
})

export default reducer 