import ActionTypes from './ActionTypes'
import axios from 'axios'

export function loadUserPlaylist(userId) {
  return dispatch => {
    requestUserPlaylist(userId, dispatch)
  }
}

export function loadSelectedPlaylist(id) {
  return dispatch => {
    requestPlaylistDetail(id, dispatch)
  }
}

function requestUserPlaylist(userId, dispatch) {
  dispatch({type: 'REQUEST_USER_PLAYLIST', userId})
  axios.get('/api/user/playlist/', {
    params: {
      offset: 0,
      limit: 1000,
      uid: userId
    }
  })
  .then((response) => {
    dispatch({type: ActionTypes.RECEIVE_USER_PLAYLIST_SUCCESS, data: response.data.playlist})
  })
  .catch((error) => {
    dispatch({type: ActionTypes.RECEIVE_USER_PLAYLIST_FAILURE, data: error})
  })
}

function requestPlaylistDetail(id, dispatch) {
  dispatch({type: 'REQUEST_PLAYLIST_DETAIL', id})
  axios.get('/api/playlist/detail', {
    params: {
      id
    }
  })
  .then((response) => {
    dispatch({type: ActionTypes.RECEIVE_PLAYLIST_DETAIL_SUCCESS, data: response.data.result})
  })
  .catch((error) => {
    dispatch({type: ActionTypes.RECEIVE_PLAYLIST_DETAIL_FAILURE, data: error})
  })
}