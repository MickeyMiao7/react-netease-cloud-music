import React, { Component } from 'react'

class Playlist extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selectedId: 0
    }
  }


  handleClick(id) {
    if (id !== this.state.selectedId) {
      this.setState({
        selectedId: id,
      })
      this.props.onPlaylistClick(id);
    }

  }


  render() {
    const userPlaylist = this.props.userPlaylist
    const selectedId = this.state.selectedId
    return(
      <ul className="side-bar">
        <li><p className="side-bar-header">推荐</p></li>
        <li><p className="side-bar-header">我的音乐</p></li>
        <li><p className="side-bar-header">创建的歌单</p>
          <ul className="playlist">
            {
              userPlaylist.map((playlist, index) => {
                 let { name, id, ...others } = playlist
                 let cls = id === selectedId ? 'selected' : ''
                 return (
                   <li onClick={() => {this.handleClick(id)}} key={id} className={cls}><span className="iconfont icon-musicmenu"></span>{name}
                   </li>
                 )
              })
            }
            <li><span className="iconfont icon-like"></span>我喜欢的音乐</li>
          </ul>

        </li>
      </ul>
    )
  }
}


export default Playlist