import React, { Component } from 'react'

class Subscriber extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    subscribers: []
  }

  render() {
    const subscribers = this.props.subscribers

    return (
      <section className="subscriber">
        {
          subscribers.length > 0 ? (
            subscribers.map((subscriber) => {
              return (
                <section className="subscriber-card">
                  <img className="subscriber-avatar" src={subscriber.avatarUrl} />
                  <p className="nickname">{subscriber.nickname}</p>
                </section>
              )
            })
        ) : (
          <p className="prompt">暂无收藏者</p>
        )}

      </section>
    )
  }

}

export default Subscriber