import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'

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