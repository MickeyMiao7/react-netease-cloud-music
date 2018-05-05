import axios from 'axios'

const API_URL = '/api'

class ClientService {
  constructor() {
    this.uid = 1404833398
  }

  getUserPlaylist(uid = this.uid) {
    axios.get('/api/user/playlist/', {
      params: {
        offset: 0,
        limit: 1000,
        uid
      }
    })
    .then((response) => {
      console.log(response.data.playlist)
    })
    .catch((error) => {
      console.log(error)
    })

  }
}

export default ClientService