import React, { Component } from 'react'

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
          <div className="search"></div>
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