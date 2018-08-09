import ActionTypes from './ActionTypes'
import axios from 'axios'

export function loadUserPlaylist(userId) {
  return dispatch => {
    requestUserPlaylist(userId, dispatch)
  }
}

export function loadPlaylist(id) {
  return dispatch => {
    requestPlaylist(id, dispatch)
  }
}

export function loadTrack(track) {
  return dispatch => {
    requestTrack(track, dispatch)
  }
}

export function loadPlaylistComment(id) {
  return dispatch => {
    requetPlaylistComment(id, dispatch)
  }
}

export function setNextTrack(track) {
  return {
    type: ActionTypes.SET_NEXT_TRACK,
    data: track
  }
}

export function setPlayingPlaylist(playlist) {
  return {
    type: ActionTypes.SET_PLAYING_PLAYLIST,
    data: playlist
  }
}

function requestTrack(track, dispatch) {
  dispatch({type: 'REQUEST_TRACK', track})
  // const url = `/api/music/url?id=${track.id}`
  axios.get('/3rdpartyAPI/music/url', {
    params: {
      id: track.id
    }
  }).then(response => {
    const _track = Object.assign({}, track, {url: response.data.data[0].url})
    dispatch({type: ActionTypes.RECEIVE_TRACK_SUCCESS, data: _track})
  }).catch(error => {
    const _track = Object.assign({}, track, {url: `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`})
    dispatch({type: ActionTypes.RECEIVE_TRACK_FAILURE, data: error })
    dispatch({type: ActionTypes.RECEIVE_TRACK_SUCCESS, data: _track})
  })
  // console.log(url)
  // axios.post(url, {
  //   ids: [track.id],
  //   br: '',
  //   csrf_token: ''
  // })

  // .then(response => {
  //   console.log(response)
  //   dispatch({type: ActionTypes.RECEIVE_TRACK_SUCCESS, data: track})

  // })
  
    dispatch({type: ActionTypes.RECEIVE_TRACK_SUCCESS, data: track})
}

function requestUserPlaylist(userId, dispatch) {
  dispatch({type: 'REQUEST_USER_PLAYLIST', userId})
  // axios.get('/api/user/playlist/', {
  //   params: {
  //     offset: 0,
  //     limit: 1000,
  //     uid: userId
  //   }
  // })
  axios.get('/3rdpartyAPI/user/playlist', {
    params: {
      uid: userId,
    }
  })
  .then(response => {
    dispatch({type: ActionTypes.RECEIVE_USER_PLAYLIST_SUCCESS, data: response.data.playlist})
  })
  .catch((error) => {
    dispatch({type: ActionTypes.RECEIVE_USER_PLAYLIST_FAILURE, data: error})
  })
}

function requestPlaylist(id, dispatch) {
  dispatch({type: 'REQUEST_PLAYLIST_DETAIL', id})
  // axios.get('/api/playlist/detail', {
  //   params: {
  //     id
  //   }
  // })

  axios.get('/3rdpartyAPI/playlist/detail', {
    params: {
      id: id,
      s: 20
    }
  })
  .then((response) => {
    dispatch({type: ActionTypes.RECEIVE_PLAYLIST_DETAIL_SUCCESS, data: response.data.playlist})
  })
  .catch((error) => {
    dispatch({type: ActionTypes.RECEIVE_PLAYLIST_DETAIL_FAILURE, data: error})
  })
}

