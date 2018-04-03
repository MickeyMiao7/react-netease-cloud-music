import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="search-bar">
        <form action="">
          <input type="text" name="searchtext" placeholder="search" />
          <span className="iconfont icon-search"></span>
        </form>
      </div>
    )
  }
}

export default SearchBar