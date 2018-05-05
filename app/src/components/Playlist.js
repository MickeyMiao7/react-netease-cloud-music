import React, { Component } from 'react'

class Playlist extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selectedId: null
    }
  }


  handleClick(id) {
    console.log(id)
    this.setState({
      selectedId: id,
    })
  }


  render() {
    const ids = [1, 2, 3]
    const selectedId = this.state.selectedId
    return(
      <ul className="side-bar">
        <li><p className="side-bar-header">推荐</p></li>
        <li><p className="side-bar-header">我的音乐</p></li>
        <li><p className="side-bar-header">创建的歌单</p>
          <ul className="playlist">
            {
              ids.map((id, index) => {
                let cls = id === selectedId ? 'selected' : ''
                return (
                  <li onClick={() => { this.handleClick(id) }} key={id} className={cls}><span className="iconfont icon-musicmenu"></span>Plasylist {id}
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