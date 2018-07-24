import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="search-bar">
        <input type="text" name="searchtext" placeholder="搜索音乐、歌手、歌词、用户" />
        <span className="iconfont icon-search"></span>
      </div>
    )
  }
}

export default SearchBar