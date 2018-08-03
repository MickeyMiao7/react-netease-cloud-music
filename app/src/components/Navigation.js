import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Navigation extends Component {
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
      // this.props.onPlaylistClick(id);
    }
  }


  render() {
    const userPlaylist = this.props.userPlaylist
    return(
      <ul className="side-bar">
        <li><p className="side-bar-header">推荐</p>
          <ul>
            <li>
              <NavLink to="/recommendation" activeClassName="selected">
                <span className="iconfont icon-musicmenu"></span>发现音乐
              </NavLink>
            </li>
            <li><NavLink to="/fm">私人FM</NavLink></li>
          </ul>
        </li>
        <li><p className="side-bar-header">我的音乐</p></li>
        <li><p className="side-bar-header">创建的歌单</p>
          <ul>
            {
              userPlaylist.map((playlist) => {
                 let { name, id } = playlist
                 return (
                   <li onClick={() => {this.handleClick(id)}} key={id} >
                     <NavLink to={`/playlist/${id}`} activeClassName="selected">
                       <span className="iconfont icon-musicmenu"></span>{name}
                     </NavLink>
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


export default Navigation