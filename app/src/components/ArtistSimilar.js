import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

import ActionTypes from '../actions/ActionTypes'

const Section = (props) => 
  <section>
    <h2>{props.title}</h2>
    <section className="paragraph">{props.paragraph}</section>
  </section>

class ArtistSimilar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introduction: [],
      briefDesc: ''
    }
  }


  async loadSimilar(id) {
    const dispacth = this.props.dispatch
    dispacth({type: ActionTypes.REQUEST_ARTIST_SIMILAR})
    const res = await axios.get('/3rdpartyAPI/simi/artist', {
      params:
        {
          id: id
        }
    }).then(response => {
      const data = response.data
      console.log(data)
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_SIMILAR_SUCCESS, data: data})
      return data
    }).catch(error => {
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_SIMILAR_FAILURE, data: error })
    })
    return res
  }

  componentDidMount() {
    this.loadSimilar(this.props.match.params.id).then(res => {
      this.setState({
        introduction: res.introduction,
        briefDesc: res.briefDesc
      })
    })
  }

  render() {
    return (
      <section className="artist-similar">

      </section>
    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSimilar)