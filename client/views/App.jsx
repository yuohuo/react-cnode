import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router.jsx'

export default class App extends Component {
  componentDidMount() {
    // do sth here
  }

  render() {
    return [
      <div>
        <Link to="/">Home Page</Link>
        <br />
        <Link to="/detail">Topic detail</Link>
      </div>,
      <Routes />
    ]
  }
}
