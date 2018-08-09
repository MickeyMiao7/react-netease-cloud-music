import React, { Component } from 'react'

const Section = (props) => 
  <section>
    <h2>{props.title}</h2>
    <section className="paragraph">{props.paragraph}</section>
  </section>

class AlbumDetail extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { description } = this.props
    return (
      <section className="artist-detail">
        { !description ?
          <p className="prompt">暂无介绍</p> :
          <Section title={'专辑介绍'} paragraph={description}/>
        }
      </section>
    )
  }

}

export default AlbumDetail