import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import ActionTypes from '../actions/ActionTypes'
import { convertCommentDate } from '../utils/util'


const URL = {
  'playlist': '/3rdpartyAPI/comment/playlist',
  'album': '/3rdpartyAPI/comment/album'
}

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: {
        comments: [],
        hotComments: []
      }
    }
 }
  static defaultProps = {
    type: 'playlist'
  }
 
  async loadComment(url, id, offset=0) {
    const { dispatch } = this.props
    dispatch({type: ActionTypes.REQUEST_PLAYLIST_COMMENT})
    const result = await axios.get(url, {
      params: {
        id: id,
        limit: 20,
        offset: offset,
      }
    })
    .then(response => {
      // console.log(response)
      dispatch({type:ActionTypes.RECEIVE_PLAYLIST_COMMENT_SUCCESS, data: response.data})
      return response.data
    })
    .catch(error => {
      dispatch({type: ActionTypes.RECEIVE_PLAYLIST_COMMENT_FAILURE, data: error})
    })
    return result
    
  }

  componentDidMount() {
    const url = URL[this.props.type]
    this.loadComment(url, this.props.match.params.id).then(result => {
      this.setState({
        comment: result
      })
    })
  }

  render() {
    const { hotComments, comments } = this.state.comment
  
    return (
      <section className="comment">
        { hotComments.length > 0  && 
          <h2>精彩评论</h2>
        }

        { hotComments.map((comment) => {
            return (
              <section className="comment-card">
                <img className="user-avatar" src={comment.user.avatarUrl}/>
                <section className="comment-wrapper">
                  <p><span className="user-nickname">{comment.user.nickname}: </span>{comment.content}</p>
                  <p className="timestamp">{convertCommentDate(comment.time)}</p>
                </section>
              </section>
            )
          })
        }
 
        <h2>最新评论</h2>
        { comments.length == 0 &&
          <p className="prompt">还没有评论哟~</p>
        }
        {
          comments.map((comment) => {
            return (
              <section className="comment-card">
                <img className="user-avatar" src={comment.user.avatarUrl}/>
                <section className="comment-wrapper">
                  <p><span className="user-nickname">{comment.user.nickname}: </span>{comment.content}</p>
                  <p className="timestamp">{convertCommentDate(comment.time)}</p>
                </section>
              </section>
            )
          })
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment)