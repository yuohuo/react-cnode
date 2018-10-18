import React, { Component } from 'react'
import axios from 'axios'

/* eslint-disable */
export default class TestApi extends Component {
  getTopics() {
    axios.get('/api/topics')
      .then((resp) => {
        console.log(resp);
      })
  }

  login() {
    axios.post('/api/user/login', {
      accessToken: 'c1f15c49-ccbb-46ab-99f0-787a67df23a6'
    }).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.getTopics}>TOPICS</button>
        <button type="button" onClick={this.login}>login</button>
        <button type="button" onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
