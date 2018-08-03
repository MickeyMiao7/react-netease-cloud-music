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

  playingTrack: {
    id: 0,
    duration: 0
  },

  nextTrack: {
    id: 0
  }
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

function lastPlaylist(state=defaultStates.playlist, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_PLAYLIST_DETAIL_SUCCESS:
      return action.data
    default:
      return state;
  }
}

function playingPlaylist(state=defaultStates.playlist, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAYING_PLAYLIST:
      return action.data
    default: 
      return state
  }
}

function playingTrack(state=defaultStates.playingTrack, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRACK_SUCCESS:
      return action.data
    default:
      return state
  }
}

function nextTrack(state=defaultStates.nextTrack, action) {
  switch (action.type) {
    case ActionTypes.SET_NEXT_TRACK:
      return action.data
    default:
      return state
  }
}

function isPlaying(state=false, action) {
  switch (action.type) {
    case ActionTypes.PLAYER_PLAY:
      return true
    case ActionTypes.PLAYER_PAUSE:
      return false
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
  lastPlaylist: lastPlaylist,
  playingPlaylist: playingPlaylist,
  playingTrack: playingTrack,
  isPlaying: isPlaying,
  error: error,
  nextTrack: nextTrack
})

export default reducer 