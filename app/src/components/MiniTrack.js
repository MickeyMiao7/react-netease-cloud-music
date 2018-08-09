import React, { Component } from 'react'

class MiniTrack extends Component {
  constructor (props) {
    super(props)
  }

  static defaultProps = {
    track: {
      al: {
        picUrl: ''
      },
      ar: {
        name: '',
      },
      name: '',

    }
  }

  render() {
    const { track } = this.props
    const src = track.al.picUrl || ''
    const trackName = track.name || 'Annoymous'
    const artistName = track.ar[0].name || 'Annoymous'


    return (
      <div className="mini-track">
        <img src={src} />
        <section>
          <span className="track-name">{trackName}</span>
          <span className="artist-name">{artistName}</span>
        </section>
      </div>
    )
  }
}

export default MiniTrack