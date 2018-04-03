import React, { Component } from 'react'
import History from '../components/History'
import SearchBar from '../components/SearchBar'
import ToolBar from '../components/Toolbar'
import Player from '../components/Player'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="netease-music">
        <header>
          <div className="logo">
          </div>
          <h1>Netease Music</h1>
          <History/>
          <SearchBar/>
          <ToolBar/>
        </header>
        <main>
          <aside></aside>
          <section></section>
        </main>
        <footer>
          <Player />
        </footer>
      </div>
    )
  }

}

export default App