import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

import ActionTypes from '../actions/ActionTypes'

const Section = (props) => 
  <section>
    <h2>{props.title}</h2>
    <section className="paragraph">{props.paragraph}</section>
  </section>

class ArtistDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introduction: [],
      briefDesc: ''
    }
  }


  async loadDes(id) {
    const dispacth = this.props.dispatch
    dispacth({type: ActionTypes.REQUEST_ARTIST_DETAIL})
    const res = await axios.get('/3rdpartyAPI/artist/desc', {
      params:
        {
          id: id
        }
    }).then(response => {
      const data = response.data
      // console.log(data)
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_DETAIL_SUCCESS, data: data})
      return data
    }).catch(error => {
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_DETAIL_FAILURE, data: error })
    })
    return res
  }

  componentDidMount() {
    this.loadDes(this.props.match.params.id).then(res => {
      this.setState({
        introduction: res.introduction,
        briefDesc: res.briefDesc
      })
    })
  }

  render() {
    const { name } = this.props
    const { briefDesc, introduction } = this.state
    console.log(introduction)
    return (
      <section className="artist-detail">
        {
          briefDesc && 
          <Section title={`${name}的简介`} paragraph={briefDesc}/>
        }

        { introduction.length > 1 && 
          introduction.map(intro => 
            <Section title={intro.ti} paragraph={intro.txt} />
          )
        }

        { (!briefDesc && introduction.length == 0) &&
          <p className="prompt">暂无介绍</p>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail)