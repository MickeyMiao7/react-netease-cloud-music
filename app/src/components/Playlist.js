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
      <ul className="playlist">
        {
          ids.map((id, index) => {
            let cls = id === selectedId ? 'selected' : ''
            return (
              <li onClick={()=>{this.handleClick(id)}} key={id} className={cls}>Plasylist {id}
              </li>
            )
          })
        }
      </ul>
    )
  }

}

export default Playlist