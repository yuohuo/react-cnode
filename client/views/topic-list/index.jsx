import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types'

import AppState from '../../store/app-state'

// const TopicList = () => <div>This is topic list</div>
// export default TopicList

@inject('appState') @observer
class TopicList extends Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do sth here
  }

  changeName(event) {
    const { appState: { changeName } } = this.props
    changeName(event.target.value)
  }

  render() {
    const { appState: { msg } } = this.props
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{msg}</span>
      </div>)
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired
}

export default TopicList
