import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import ToolBar from '../components/Toolbar'

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
          <SearchBar/>
          <ToolBar/>

          <div className="tool-bar"></div>
        </header>
        <main>
          <aside></aside>
          <section></section>
        </main>
        <footer>
          {/* <Player /> */}
        </footer>
      </div>
    )
  }

}

export default App